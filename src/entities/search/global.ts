export type templates = { _id: string; title: string };
export type comments = { text: string; template: string };
export type tags = { tag: string; templates: templates[] };
export type globalSearchType = {
  templates: templates[];
  tags: tags[];
  comments: comments[];
};
