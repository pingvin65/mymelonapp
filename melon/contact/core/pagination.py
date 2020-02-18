from collections import OrderedDict

from rest_framework import pagination
from rest_framework.response import Response
from rest_framework.utils.urls import remove_query_param, replace_query_param


class MelonLimitOffsetPagination(pagination.LimitOffsetPagination):
    # def get_paginated_response(self, data):
    #     return Response({
    #         'page_number': self.page.number,
    #         'count': self.page.paginator.count,
    #         'next': self.get_next_link(),
    #         'previous': self.get_previous_link(),
    #         'results': data
    #     })
    # def get_paginated_response(self, data):
    #     return Response(OrderedDict([
    #         ('count', self.count),
    #         ('next', self.get_next_link()),
    #         ('previous', self.get_previous_link()),
    #         ('results', data)
    #     ]))
    # default_limit = 20
    max_limit = 200

    def get_first_link(self):
        if self.offset <= 0:
            return None
        url = self.request.build_absolute_uri()
        #url =''
        return remove_query_param(url , self.offset_query_param)

    # def get_last_link(self):
    #     if self.offset + self.limit >= self.count:
    #         return None
    #     url = self.request.build_absolute_uri()
    #     url = replace_query_param(url, self.limit_query_param, self.limit)
    #     offset = self.count - self.limit
    #     return replace_query_param(url, self.offset_query_param, offset)

    def get_last_link(self):
        if self.offset + self.limit >= self.count:
            return None
        print(self.request.path)
        url = self.request.build_absolute_uri()
        # url = ''
        url = replace_query_param(url, self.limit_query_param, self.limit)
        offset = self.count - self.limit
        return replace_query_param(url, self.offset_query_param, offset)

    def get_paginated_response(self, data):
        # print(self.limit)
        # print(23 % 5)
        # samo = 0 if self.count % self.limit == 0 else 1
        pages = self.count // self.limit + (0 if self.count % self.limit == 0 else 1)
        return Response(OrderedDict([
            ('count', self.count),
            ('limit', self.limit),
            ('pages', pages),
            ('offset', self.offset),
            ('first', self.get_first_link()),
            ('last', self.get_last_link()),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))
