from django.conf.urls import include
from django.urls import path

from .views import user_views, lost_views, found_views, comment_views, mypage_views


from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
	url(r'^signup/$', user_views.SignUp.as_view()),
	url(r'^signin/$', user_views.SignIn.as_view()),
	url(r'^auth/(?P<mySNU_verification_token>[a-zA-Z0-9]+)/$', user_views.Authenticate.as_view()),
	url(r'^get_auth_token/', obtain_auth_token),

	path('mypage/', mypage_views.index, name='mypage'),
	path('mypage/<int:found_page_number>/<int:lost_page_number>/<int:checking_page_number>/<int:found_comment_page_number>/<int:lost_comment_page_number>/', mypage_views.index_with_page, name='mypage_with_page'),
	path('mypage/change/', mypage_views.change, name='change'),

	path('lost/', lost_views.index, name='lost'),
	path('lost/page/<int:page_number>/', lost_views.index_with_page, name='lost_paginated'),
	path('lost/closed/', lost_views.closed, name='lost_closed'),
	path('lost/closed/page/<int:page_number>/', lost_views.closed_with_page, name='lost_closed_paginated'),
	path('lost/old/', lost_views.old, name='lost_old'),
	path('lost/old/page/<int:page_number>/', lost_views.old_with_page, name='lost_old_paginated'),
	path('lost/<int:post_id>/', lost_views.detail.as_view(), name='lost_detail'),
	path('lost/<int:post_id>/caseclose/', lost_views.case_close.as_view(), name='lost_case_close'),

	path('found/', found_views.index, name='found'),
	path('found/page/<int:page_number>/', found_views.index_with_page, name='found_paginated'),
	path('found/closed/', found_views.closed, name='found_closed'),
	path('found/closed/page/<int:page_number>/', found_views.closed_with_page, name='found_closed_paginated'),
	path('found/old/', found_views.old, name='found_old'),
	path('found/old/page/<int:page_number>/', found_views.old_with_page, name='found_old_paginated'),
	path('found/<int:post_id>/', found_views.detail.as_view(), name='found_detail'),
	path('found/<int:post_id>/check/', found_views.check, name='found_check'),
	path('found/<int:post_id>/caseclose/', found_views.case_close.as_view(), name='found_case_close'),

	path('comment/lost/<int:post_id>/', comment_views.lost, name='comment_lost'),
	path('comment/lost/<int:post_id>/<int:comment_id>/', comment_views.lost_detail.as_view(), name='comment_lost_detail'),
	path('comment/found/<int:post_id>/', comment_views.found, name='comment_found'),
	path('comment/found/<int:post_id>/<int:comment_id>/', comment_views.found_detail.as_view(), name='comment_found_detail'),

]

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls')),
]
