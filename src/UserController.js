var app = angular.module('sampleApp');

app.controller('UserController', function($scope, PaginationService){

	function init() {

		$scope.users = [];

		$scope.pager = {
			start: 0,
			end: 10,
			currentPage: 1,
			position: 1
		};

		$scope.display = {
			start: 0,
			end: 5
		};

		for(var i=0;i<100;i++) {

			$scope.users.push(i);
		}

		$scope.pageLength = PaginationService.pagination($scope.users.length, 10);

		$scope.overallPage = 1;

		pagination();
	}

	// Initialize pagination configurations
	init();

	$scope.Next = function() {

		var data = PaginationService.next($scope.pager, $scope.users.length);
		angular.extend($scope.pager, data);
		
		// If current page === 3 then increase the pages list 
		if($scope.pager.currentPage === 3) {

			incrementDisplay();
		}

		// If pages are available (upto pages - 2 values) then increment the current page 
		if($scope.overallPage < $scope.pageLength - 2) {

			// If current page < 3 increase the current page value
			if($scope.pager.currentPage < 3) {

				$scope.pager.currentPage++;
			}
		} else{ 

			// If pages are not available (> pages -2 length) increase the current page value upto 5
			$scope.pager.currentPage++;
		}

		$scope.overallPage++;
		pagination();
	};

	$scope.Prev = function() {

		var data = PaginationService.prev($scope.pager, $scope.users.length);
		angular.extend($scope.pager, data);

		if($scope.pager.currentPage === 3) {

			decrementDisplay();
		}

		if($scope.overallPage > $scope.pageLength - 2) {

			$scope.pager.currentPage--;
		}else {

			if($scope.pager.currentPage > 0 && $scope.pager.currentPage < 3) {

				$scope.pager.currentPage--;
			} else if($scope.overallPage <= $scope.pager.currentPage) {

				$scope.pager.currentPage--;
			}
		}
		$scope.overallPage--;
		pagination();
	};

	function incrementDisplay() {

		if($scope.display.end < $scope.pageLength) {

			$scope.display.start++;
			$scope.display.end++;
		}
	}

	function decrementDisplay() {

		if($scope.display.start > 0) {

			$scope.display.start--;
			$scope.display.end--;
		}
	}

	function pagination() {

		$scope.pages = [];

		for(var i=$scope.display.start;i<$scope.display.end;i++) {

			$scope.pages.push(i+1);
		}
	};

	$scope.activatePage = function(index) {

		var data = PaginationService.activatePage(index, $scope.pager.currentPage);
		return data;
	};

	$scope.disabled = function(prev) {

		if('prev' === prev){

			if($scope.pager.start == 0) {

				return 'disabled';
			} else {

				return '';
			}
		} else {

			if($scope.pager.end == $scope.users.length) {

				return 'disabled';
			} else {

				return '';
			}
		}
	}
});