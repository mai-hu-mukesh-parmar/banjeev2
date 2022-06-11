import {services} from './env';

let urls = {
  headers: {
    'Content-Type': 'application/json',
  },
  LOGIN: services.AUTH,
  BASIC_AUTH: 'Basic aXRwbDppd2FudHVubGltaXRlZA==',
  ASSETS: {
    ASSETS: services.ASSETS + 'assets/filter',
    CATEGORY: services.BANJEE_ASSET + '/category/filter',
    SUB_CATEGORY: services.BANJEE_ASSET + '/sub-category/filter',
    CREATE_SUB_CATEGORY: services.ASSETS + 'sub-category',
  },
  CDN: {
    UPLOAD_SEND: services.CDN_SERVICE + 'upload/send',
    UPLOAD_SESSION: services.CDN_SERVICE + 'upload/session',
  },
  GIF: {
    SEARCH_GIF: services.GIF + '/search?api_key=',
    TRENDING_GIF: services.GIF + '/trending?api_key=',
    RANDOM_GIF: services.GIF + '/random?api_key=',
  },
  USER: {
    //`````````````````` SYSTEM USER API

    EXITS_USER: services.USER_SYSTEM_API + '/users/exits',
    OTP_SEND_REGISTER: services.USER_SYSTEM_API + '/otp',
    VALIDATE_OTP: services.USER_SYSTEM_API + '/otp/validate',
    FORGOTPASSWORD: services.USER_SYSTEM_API + '/users/forgotPassword',
    GET_COUNTRY_CODE:
      services.USER_SYSTEM_API + '/system/country/findAll/domain/banjee',

    //``````````````````    USER-PROFILE API

    REGISTRATION: services.USER__USER_API + '/profile',
    GET_USER_PROFILE: services.USER__USER_API + '/profile/findById/',
    GET_USER: services.USER__USER_API + '/registry/findBySystemUserId/',
    GET_ALL_USER: services.USER__USER_API + '/registry/filter',
    UPDATE_USER: services.USER__USER_API + '/registry',
    MODIFY: services.USER__USER_API + '/registry/modify',

    //`````````````````` SOCIAL CONNECTION

    CREATE_REPORT: services.SOCIAL_CONNECTION + '/report',
    FILTER_CONNECTION: services.SOCIAL_CONNECTION + '/my-connections',
    UNBLOCK: services.SOCIAL_CONNECTION + '/social-connection/unblock/',
    BLOCK: services.SOCIAL_CONNECTION + '/social-connection/block/',
    CREATE_ROOM: services.SOCIAL_CONNECTION + '/social-connection/create-group',
    UPDATE_ROOM: services.SOCIAL_CONNECTION + '/social-connection/update-group',
    DELETE_ROOM:
      services.SOCIAL_CONNECTION + '/social-connection/create-group/delete/',
    OUR_ROOM: services.SOCIAL_CONNECTION + '/social-connection/group/filter',
    ADD_MEMBER_IN_GROUP:
      services.SOCIAL_CONNECTION + '/group-connection-request/addMember',
    FRIEND_REQUEST: services.SOCIAL_CONNECTION + '/connection-request',
    FRIEND_REQUEST_NOTIFICAION:
      services.SOCIAL_CONNECTION + '/connection-request/filter',
    OTHER_ROOM:
      services.SOCIAL_CONNECTION + '/social-connection/group/other/filter',
    REMOVE_MEMBER_FROM_GROUP:
      services.SOCIAL_CONNECTION + '/social-connection/group/remove',
    ACCEPT_FRIEND_REQUEST:
      services.SOCIAL_CONNECTION + '/connection-request/accept/',
    REJECT_FRIEND_REQUEST:
      services.SOCIAL_CONNECTION + '/connection-request/reject/',
    UNFRIEND: services.SOCIAL_CONNECTION + '/social-connection/unfriend/',
    SEARCH_FRIEND: services.SOCIAL_CONNECTION + '/my-connections',
    OTHER_BANJEE_DETAIL:
      services.SOCIAL_CONNECTION + '/social-connection/filter',

    //``````````````````` USER API

    VOICE_INTRO: services.USER__USER_API + '/voiceintro/update',
    ACTION_CONTACTS_REGISTRY:
      services.USER__USER_API + '/registry/find-Contacts',

    // ADD_ADDRESS: services.USER__USER_API + "/address",
    // ALL_ADDRESS: services.USER__USER_API + "/address/findAll",
    // DELETE_ADDRESS: services.USER__USER_API + "/address/delete/",
    // LIST_CITY: services.USER_SYSTEM_API + "/system/city/filter",
    // LIST_STATE: services.USER_SYSTEM_API + "/system/states/filter",
    // LIST_COUNTRY: services.USER_SYSTEM_API + "/system/country/findAll",
  },
  // ````````````````````````` POST FEED || social feeds

  COMMENT: services.POST + 'comments/byFeed/',
  POST_FEED: services.POST + 'feeds/filter',
  CREATE_FEED: services.POST + 'feeds',
  MYPOST: services.POST + 'feeds/my',
  POST_COMMENTS: services.POST + 'comments',
  POST_REACTION: services.POST + 'reaction',
  OTHER_POST: services.POST + 'feeds/other',
  FIND_POST: services.POST + 'feeds/findById/',
  DELETE_POST: services.POST + 'feeds/delete/',
  GET_COMMENT_LIKE: services.POST + 'reaction/by-comment/',
  DELETE_COMMENT: services.POST + 'comments/delete/',

  RTC: {
    CHAT: {
      HISTORY: services.MESSAGE_BROKER + '/chat-history/filter',
      DELETE: services.MESSAGE_BROKER + '/chat-history/delete/',
      NOTIFICATION: services.MESSAGE_BROKER + '/message/delivery/filter',
      READ_NOTIFICATION: services.MESSAGE_BROKER + '/message/delivery/read/',
    },
  },
};

export default urls;
