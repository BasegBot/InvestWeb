export default interface WikiPage {
  slug: string;
  layout?: string;
  content: string;
  language: string;
  path: string;
  data: {
    layout?: string;
  };
}
