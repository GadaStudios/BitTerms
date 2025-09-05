interface TermInstance {
  name: string;
  definition?: TypedObject | TypedObject[];
  technicalDefinition: TypedObject | TypedObject[];
  illustration?: {
    _key: string;
    asset: {
      _id: string;
      url: string;
    };
  } | null;
  author?: string;
}
