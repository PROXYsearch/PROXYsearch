#!/usr/bin/perl

use strict;
use warnings;
#use diagnostics;

use LWP::UserAgent;
use CGI;

my $cgi = CGI->new();
my $content = qq(<hr/>);

foreach my $key ( $cgi->param() ) {
	#my $input{$key} = $cgi->param($key);
	$content .= qq(<p><h3>$key:</h3> $cgi->param($key)</p>);
}


my $url = $input{url};
my $ua = LWP::UserAgent->new();
my $response = $ua->post( $url, $cgi->param );
my $content .= $response->decoded_content();

$content .= qq(\n\n);
print $cgi->header("text/html"), $content;
