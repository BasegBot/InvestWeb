export default interface WikiPage {
  slug: string;
  layout?: string;
  content: string;
  data: {
    layout?: string;
  };
}
