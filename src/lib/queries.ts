export const queryApprovedTerms = () => {
  const query = `*[_type == "term" && approved == true]{
      name,
      definition,
      technicalDefinition,
      illustration{
        _key,
        asset->{
          _id,
          url
        }
      },
      author,
      audio
    } | order(name asc)`;

  return query;
};
