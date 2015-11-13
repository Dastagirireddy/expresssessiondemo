var app = angular.module('sampleApp');

app.service('PaginationService', PaginationService);

function PaginationService() {

	var self = this;
	self.next = Next;
	self.prev = Previous;
	self.pagination = Pagination;
	self.activatePage = activateCurrentPage;

	function Next(obj, len) {
	
		if(obj.end !== len) {

			var data = obj.end - obj.start;
			obj.start = obj.end;
			obj.end += data;
		}
		return obj;
	}

	function Previous(obj) {

		if(obj.start > 0) {

			var data = obj.end - obj.start;
			obj.end = obj.start;
			obj.start -= data;
		}
		return obj;
	}

	function Pagination(itemsCount, perPage) {

		var pages;

		pages = Math.ceil(itemsCount / perPage);
		return pages;
	}

	function activateCurrentPage(index, currentPage) {

		if(index+1 === currentPage) {

			return 'active';
		} else {

			return '';
		}
	}
}

