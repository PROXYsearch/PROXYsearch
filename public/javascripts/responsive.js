// JAVASCRIPT MEDIA QUERY

var queries = [
    {
        context: 'mobile',
        callback: function() {
            console.log('Mobile callback. Maybe hook up some tel: numbers?');
            // Your mobile specific logic can go here. 
            
    
        // set EVERY 'state' here so will undo ALL layout changes
        // used by the 'Reset State' button: myLayout.loadState( stateResetSettings )
        var stateResetSettings = {
                north__size:        43
            ,   north__initClosed:  false
            ,   north__initHidden:  false
            ,   south__size:        "auto"
            ,   south__initClosed:  true
            ,   south__initHidden:  true
            ,   west__size:         225
            ,   west__initClosed:   false
            ,   west__initHidden:   false
            ,   east__size:         290
            ,   east__initClosed:   true
            ,   east__initHidden:   false
        };
    
        var myLayout;
    
        $(document).ready(function () {
    
            // this layout could be created with NO OPTIONS - but showing some here just as a sample...
            // myLayout = $('body').layout(); -- syntax with No Options
    
            myLayout = $('body').layout({
    
            //  enable showOverflow on west-pane so CSS popups will overlap north pane
                west__showOverflowOnHover: false
    
            //  reference only - these options are NOT required because 'true' is the default
            ,   closable:               true    // pane can open & close
            ,   resizable:              true    // when open, pane can be resized 
            ,   slidable:               true    // when closed, pane can 'slide' open over other panes - closes on mouse-out
    
            //  some resizing/toggling settings
            ,   north__slidable:        false   // OVERRIDE the pane-default of 'slidable=true'
            ,   south__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'
            ,   north__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'
            ,   north__size:            43  // OVERRIDE the pane-default of 'resizable=true'
            ,   south__size:            0   // OVERRIDE the pane-default of 'resizable=true'
            ,   south__spacing_open:    0       // no resizer-bar when open (zero height)
            ,   north__spacing_open:    0       // no resizer-bar when open (zero height)
            ,   south__spacing_closed:  0       // big resizer-bar when open (zero height)
            ,   east__initClosed:       true
            ,   west__initClosed:       false
            ,   south__initClosed:      true
            //  some pane-size settings
            ,   west__minSize:          190
            ,   west__size:             225
            ,   east__size:             290
            ,   east__minSize:          200
            ,   east__maxSize:          Math.floor(screen.availWidth / 2) // 1/2 screen width
            ,   center__minWidth:       100
    
            ,   useStateCookie:         true
            });
    
            
            myLayout.destroy(); 
           

    });

        }
    },
    {
        context: 'tablet',
        callback: function() {
            console.log('tablet callback! Swap the class on the body element.');
            // Your tablet specific logic can go here.
           
    
        // set EVERY 'state' here so will undo ALL layout changes
        // used by the 'Reset State' button: myLayout.loadState( stateResetSettings )
        var stateResetSettings = {
                north__size:        43
            ,   north__initClosed:  false
            ,   north__initHidden:  false
            ,   south__size:        "auto"
            ,   south__initClosed:  true
            ,   south__initHidden:  true
            ,   west__size:         190
            ,   west__initClosed:   false
            ,   west__initHidden:   false
            ,   east__size:         290
            ,   east__initClosed:   true
            ,   east__initHidden:   false
        };
    
        var myLayout;
    
        $(document).ready(function () {
    
            // this layout could be created with NO OPTIONS - but showing some here just as a sample...
            // myLayout = $('body').layout(); -- syntax with No Options
    
            myLayout = $('body').layout({
    
            //  enable showOverflow on west-pane so CSS popups will overlap north pane
                west__showOverflowOnHover: false
    
            //  reference only - these options are NOT required because 'true' is the default
            ,   closable:               true    // pane can open & close
            ,   resizable:              true    // when open, pane can be resized 
            ,   slidable:               true    // when closed, pane can 'slide' open over other panes - closes on mouse-out
    
            //  some resizing/toggling settings
            ,   north__slidable:        false   // OVERRIDE the pane-default of 'slidable=true'
            ,   south__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'
            ,   north__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'
            ,   north__size:            43  // OVERRIDE the pane-default of 'resizable=true'
            ,   south__size:            0   // OVERRIDE the pane-default of 'resizable=true'
            ,   south__spacing_open:    0       // no resizer-bar when open (zero height)
            ,   north__spacing_open:    0       // no resizer-bar when open (zero height)
            ,   south__spacing_closed:  0       // big resizer-bar when open (zero height)
            ,   east__initClosed:       true
            ,   west__initClosed:       false
            ,   south__initClosed:      true
            //  some pane-size settings
            ,   west__minSize:          190
            ,   west__size:             190
            ,   east__size:             290
            ,   east__minSize:          200
            ,   east__maxSize:          Math.floor(screen.availWidth / 2) // 1/2 screen width
            ,   center__minWidth:       100
    
            ,   useStateCookie:         true
            });
    
            myLayout.loadState( stateResetSettings );

            //myLayout.panes.hide(); 
            //myLayout.resizers.hide(); 
            //myLayout.destroy(); 
       
           

    });

        }
    },
    {
        context: 'tabletPortrait',
        callback: function() {
            console.log('tabletPortrait callback! Swap the class on the body element.');
            // Your tablet specific logic can go here.
       

    
        // set EVERY 'state' here so will undo ALL layout changes
        // used by the 'Reset State' button: myLayout.loadState( stateResetSettings )
        var stateResetSettings = {
                north__size:        43
            ,   north__initClosed:  false
            ,   north__initHidden:  false
            ,   south__size:        "auto"
            ,   south__initClosed:  true
            ,   south__initHidden:  true
            ,   west__size:         225
            ,   west__initClosed:   false
            ,   west__initHidden:   false
            ,   east__size:         290
            ,   east__initClosed:   true
            ,   east__initHidden:   false
        };
    
        var myLayout;
    
        $(document).ready(function () {
    
            // this layout could be created with NO OPTIONS - but showing some here just as a sample...
            // myLayout = $('body').layout(); -- syntax with No Options
    
            myLayout = $('body').layout({
    
            //  enable showOverflow on west-pane so CSS popups will overlap north pane
                west__showOverflowOnHover: false
    
            //  reference only - these options are NOT required because 'true' is the default
            ,   closable:               true    // pane can open & close
            ,   resizable:              true    // when open, pane can be resized 
            ,   slidable:               true    // when closed, pane can 'slide' open over other panes - closes on mouse-out
    
            //  some resizing/toggling settings
            ,   north__slidable:        false   // OVERRIDE the pane-default of 'slidable=true'
            ,   south__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'
            ,   north__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'
            ,   north__size:            43  // OVERRIDE the pane-default of 'resizable=true'
            ,   south__size:            0   // OVERRIDE the pane-default of 'resizable=true'
            ,   south__spacing_open:    0       // no resizer-bar when open (zero height)
            ,   north__spacing_open:    0       // no resizer-bar when open (zero height)
            ,   south__spacing_closed:  0       // big resizer-bar when open (zero height)
            ,   east__initClosed:       true
            ,   west__initClosed:       false
            ,   south__initClosed:      true
            //  some pane-size settings
            ,   west__minSize:          190
            ,   west__size:             225
            ,   east__size:             290
            ,   east__minSize:          200
            ,   east__maxSize:          Math.floor(screen.availWidth / 2) // 1/2 screen width
            ,   center__minWidth:       100
    
            ,   useStateCookie:         true
            });
    
             myLayout.hide('west'); 
           

    });
        

        }
    },
    {
        context: 'desktop',
        callback: function() {
            console.log('wide-screen callback woohoo! Load some heavy desktop JS badddness.');
            // your desktop specific logic can go here.

            // jQuery UI Layout Below
           
            // set EVERY 'state' here so will undo ALL layout changes
            // used by the 'Reset State' button: myLayout.loadState( stateResetSettings )
            var stateResetSettings = {
                    north__size:        43
                ,   north__initClosed:  false
                ,   north__initHidden:  false
                ,   south__size:        "auto"
                ,   south__initClosed:  true
                ,   resizeWhileDragging: true
                ,   south__initHidden:  true
                ,   west__size:         225
                ,   west__initClosed:   false
                ,   west__initHidden:   false
                ,   east__size:         290
                ,   east__initClosed:   true
                ,   east__initHidden:   false
            };
        
            var myLayout;
        
            $(document).ready(function () {
        
                // this layout could be created with NO OPTIONS - but showing some here just as a sample...
                // myLayout = $('body').layout(); -- syntax with No Options
        
                myLayout = $('body').layout({
        
                //  enable showOverflow on west-pane so CSS popups will overlap north pane
                    west__showOverflowOnHover: false
        
                //  reference only - these options are NOT required because 'true' is the default
                ,   closable:               true    // pane can open & close
                ,   resizable:              true    // when open, pane can be resized 
                ,   slidable:               true    // when closed, pane can 'slide' open over other panes - closes on mouse-out
        
                //  some resizing/toggling settings
                ,   north__slidable:        false   // OVERRIDE the pane-default of 'slidable=true'
                ,   south__slidable:        false   // OVERRIDE the pane-default of 'slidable=true'
                ,   east__slidable:        false   // OVERRIDE the pane-default of 'slidable=true'

                ,   north__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'
                ,   south__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'
                ,   east__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'
                ,   west__resizable:       false   // OVERRIDE the pane-default of 'resizable=true'

                ,   north__size:            43  // OVERRIDE the pane-default of 'resizable=true'
                ,   south__size:            43   // OVERRIDE the pane-default of 'resizable=true'
                ,   south__spacing_open:    0       // no resizer-bar when open (zero height)
                ,   north__spacing_open:    0       // no resizer-bar when open (zero height)

                ,   east__initClosed:       true
                ,   east__spacing_open:    0       // no resizer-bar when open (zero height)

                ,   west__spacing_closed:   6
                ,   west__spacing_open:     6
                ,   west__initClosed:       false

                ,   resizeWhileDragging: false
                ,   west__minSize:          225
                ,   west__size:             225
                ,   center__minWidth:       100

                ,   useStateCookie:         true
                });
                

                // myLayout.slideOpen( "west" );
                // myLayout.loadState( stateResetSettings );

            });
        }
    }
];
// Go!
MQ.init(queries);

