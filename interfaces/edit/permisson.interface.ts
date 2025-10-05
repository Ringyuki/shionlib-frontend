export interface Permission {
  allowMask: string
  fields: {
    [key in PermissionFields]: boolean
  }
  scalarFields: scalarFields[]
  relationFields: relationFields[]
}

export type PermissionFields =
  | 'v_id'
  | 'b_id'
  | 'title_jp'
  | 'title_zh'
  | 'title_en'
  | 'intro_jp'
  | 'intro_zh'
  | 'intro_en'
  | 'aliases'
  | 'release_date'
  | 'type'
  | 'platform'
  | 'extra_info'
  | 'tags'
  | 'staffs'
  | 'links'
  | 'covers'
  | 'images'
  | 'developers'
  | 'characters'
  | 'status'
  | 'nsfw'
  | 'views'

export const permissionFieldsArray: PermissionFields[] = [
  'v_id',
  'b_id',
  'title_jp',
  'title_zh',
  'title_en',
  'intro_jp',
  'intro_zh',
  'intro_en',
  'aliases',
  'release_date',
  'type',
  'platform',
  'extra_info',
  'tags',
  'staffs',
  'links',
  'covers',
  'images',
  'developers',
  'characters',
  'status',
  'nsfw',
  'views',
]

export type scalarFields =
  | 'IDS'
  | 'TITLES'
  | 'INTROS'
  | 'ALIASES'
  | 'RELEASE'
  | 'TYPE'
  | 'PLATFORMS'
  | 'EXTRA'
  | 'TAGS'
  | 'STAFFS'
  | 'STATUS'
  | 'NSFW'
  | 'VIEWS'

export type relationFields =
  | 'MANAGE_LINKS'
  | 'MANAGE_COVERS'
  | 'MANAGE_IMAGES'
  | 'MANAGE_DEVELOPERS'
  | 'MANAGE_CHARACTERS'

export type Fields = Record<PermissionFields, boolean>
// "allowMask": "262143",
// "fields": {
//     "v_id": true,
//     "b_id": true,
//     "title_jp": true,
//     "title_zh": true,
//     "title_en": true,
//     "intro_jp": true,
//     "intro_zh": true,
//     "intro_en": true,
//     "aliases": true,
//     "release_date": true,
//     "type": true,
//     "platform": true,
//     "extra_info": true,
//     "tags": true,
//     "staffs": true,
//     "links": true,
//     "covers": true,
//     "images": true,
//     "developers": true,
//     "characters": true,
//     "status": true,
//     "nsfw": true,
//     "views": true
// },
// "scalarFields": [
//     "IDS",
//     "TITLES",
//     "INTROS",
//     "ALIASES",
//     "RELEASE",
//     "TYPE",
//     "PLATFORMS",
//     "EXTRA",
//     "TAGS",
//     "STAFFS",
//     "STATUS",
//     "NSFW",
//     "VIEWS"
// ],
// "relationFields": [
//     "MANAGE_LINKS",
//     "MANAGE_COVERS",
//     "MANAGE_IMAGES",
//     "MANAGE_DEVELOPERS",
//     "MANAGE_CHARACTERS"
// ]
