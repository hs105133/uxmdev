'use strict';
angular.module('techmApp').controller('presentationCtrl', function($scope, RestService, $routeParams, $modal) {

    $scope.$on('onRepeatLast', function(scope, element, attrs){
	var $container = $( '#presentation' ),
		$bookBlock = $( '#bb-bookblock' ),
		$items = $bookBlock.children(),
		itemsCount = $items.length,
		current = 0,
		bb = $( '#bb-bookblock' ).bookblock( {
			speed : 800,
			perspective : 2000,
			shadowSides	: 0.8,
			shadowFlip	: 0.4,
			onEndFlip : function(old, page, isLimit) {
				
				current = page;
				// update TOC current
				updateTOC();
				// updateNavigation
				updateNavigation( isLimit );
				// initialize jScrollPane on the content div for the new item
				setJSP( 'init' );
				// destroy jScrollPane on the content div for the old item
				setJSP( 'destroy', old );
				$("#presentation .content").removeClass("overflowHidden");

			}
		} ),
		$navNext = $( '#bb-nav-next' ),
		$navPrev = $( '#bb-nav-prev' ).hide(),
		$menuItems = $container.find( 'ul.menu-toc > li' ),
		$tblcontents = $( '#tblcontents' ),
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames.transition,
		supportTransitions = true;

	function init() {

		// initialize jScrollPane on the content div of the first item
		setJSP( 'init' );
		initEvents();

	}

	function movePrev(){
			$("#presentation .content").addClass("overflowHidden");
			bb.prev();
			return false;
	}

	function moveNext(){
			$("#presentation .content").addClass("overflowHidden");
			bb.next();
			return false;
	}

	$(window).on('keydown', function(e){

		if (e.keyCode === 37)
			movePrev();
		else if (e.keyCode === 39)
			moveNext();

	});
	
	function initEvents() {

		// add navigation events
		$navNext.on( 'click', function() {
			moveNext();
		} );

		$navPrev.on( 'click', function() {
			movePrev();
		} );
		
		// add swipe events
		$items.on( {
			'swipeleft'		: function( event ) {
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.next();
				return false;
			},
			'swiperight'	: function( event ) {
				if( $container.data( 'opened' ) ) {
					return false;
				}
				bb.prev();
				return false;
			}
		} );

		// show table of contents
		$tblcontents.on( 'click', toggleTOC );

		// click a menu item
		$menuItems.on( 'click', function() {

			var $el = $( this ),
				idx = $el.index(),
				jump = function() {
					bb.jump( idx + 1 );
				};
			
			current !== idx ? closeTOC( jump ) : closeTOC();

			return false;
			
		} );

		// reinit jScrollPane on window resize
		$( window ).on( 'debouncedresize', function() {
			// reinitialise jScrollPane on the content div
			setJSP( 'reinit' );
		} );

	}

	function setJSP( action, idx ) {
		var $content,
			apiJSP;

			idx  === undefined ? current : idx,
			$content = $items.eq( idx ).children( 'div.content' ),
			apiJSP = $content.data( 'jsp' );
		
		if( action === 'init' && apiJSP === undefined ) {
			//$content.jScrollPane({verticalGutter : 0, hideFocus : true });
		}
		else if( action === 'reinit' && apiJSP !== undefined ) {
			apiJSP.reinitialise();
		}
		else if( action === 'destroy' && apiJSP !== undefined ) {
			apiJSP.destroy();
		}

	}

	function updateTOC() {
		$menuItems.removeClass( 'menu-toc-current' ).eq( current ).addClass( 'menu-toc-current' );
	}

	function updateNavigation( isLastPage ) {
		
		if( current === 0 ) {
			$navNext.show();
			$navPrev.hide();
		}
		else if( isLastPage ) {
			$navNext.hide();
			$navPrev.show();
		}
		else {
			$navNext.show();
			$navPrev.show();
		}

	}

	function toggleTOC() {
		var opened = $container.data( 'opened' );
		opened ? closeTOC() : openTOC();
	}

	function openTOC() {
		$navNext.hide();
		$navPrev.hide();
		$container.addClass( 'slideRight' ).data( 'opened', true );
	}

	function closeTOC( callback ) {

		updateNavigation( current === itemsCount - 1 );
		$container.removeClass( 'slideRight' ).data( 'opened', false );
		if( callback ) {
			if( supportTransitions ) {
				$container.on( transEndEventName, function() {
					$( this ).off( transEndEventName );
					callback.call();
				} );
			}
			else {
				callback.call();
			}
		}
	}
	
     init();
    });
    
    $scope.slides = [];
    // RestService.slideService().success(function(data){
    //     $scope.slides = data.myslides;
    // });
	 $scope.coverId = $routeParams.coverId;
     $scope.slides = RestService.mySlideService().query({coverId: $routeParams.coverId});

    // Initially, do not go into full screen
    $scope.isFullscreen = false;

    $scope.openShareDialog = function(){
	    $modal.open({
	      templateUrl: "views/myShareDialog.html",
	      controller: shareModalCtrl
	    });
    };

    var shareModalCtrl = function($scope, $modalInstance){
	      	  $scope.closeShareDialog = function () {
			    $modalInstance.dismiss('cancel');
			  };
	      };

	shareModalCtrl.$inject = ['$scope', '$modalInstance'];      

    $scope.toggleFullScreen = function() {
        $scope.isFullscreen = !$scope.isFullscreen;
    };

 //    $('#shareDialog').on('hide.bs.modal', function (e) {
 //  		$(".asideSection").addClass("show");
	// });

    // RestService.coverService().query(function(data){
    //      $scope.slides = data.slides;
    // }, function(data){
    //     $scope.slides = data.slides;
    // });
  });