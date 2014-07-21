#!/usr/bin/perl

use strict;
use warnings;
#use diagnostics;

use HTML::TreeBuilder::XPath;
use LWP::UserAgent;
use HTTP::Request::Common qw { POST };
use CGI ':standard'; 
#use CGI ':standard', '-debug'; 

my @all_cases;

sub dedup_and_sort_all_cases {
	return @all_cases;
}

# processPageContentWide(HTTP::Response response)
# specific to south carolina site as of July 20 2014
sub processPageContentWide_treebuilder_xpath {
	my $response = $_[0];
	my $tree = HTML::TreeBuilder::XPath->new;
	my $html = $response->decoded_content;
	$tree->parse($html);

	my $search_results_html = $tree->findnodes_as_string( '//div[@id="pageContentWide"]//a[@class="bluelink2"]' );

	return qq(<p>$html</p>);
}

sub processResponse {
	return processPageContentWide_treebuilder_xpath($_[0]);
}

my $ua = LWP::UserAgent->new();
my $cgi = CGI->new();
my $content = qq(<hr/>);

my %form_inputs = (); 
my $form_action = $cgi->param("form-mash-url[0]");
my @keys = $cgi->param;
foreach my $key (@keys) {
	my $val = $cgi->param($key);
	$content .= qq(<p>);
	$content .= qq(<h3>$key</h3><h4>$val</h4>);
	$form_inputs{$key} = $cgi->param($key);
	if( $key eq "form-mash-url[0]" ) {
		#skip first key
		next;
	}
	elsif( $key =~ /^form-mash-url\[\d{1,3}\]$/ ) {
		if( scalar(keys(%form_inputs)) > 0 ) {
			#submit to $form_action with current set of form_inputs
			my $request = POST( $form_action, \%form_inputs);
			my $response = $ua->request( $request );
			if( $response->is_error ) {
				$content .= qq("<small>Error: $form_action<p>$response->status_line</p><p>---begin request---</p><p>$request->as_string()</p><p>---end request---</p></small>);
			}
			$content .= processResponse( $response );
		}

		#reset
		$form_action = $cgi->param($key);
		%form_inputs = ();

		$content .= qq(</p>);
	}
}


# $content .= dedup_and_sort_all_cases();

$content .= qq(\n\n);
print "Content-type: text/html\n\n";
print $content;
