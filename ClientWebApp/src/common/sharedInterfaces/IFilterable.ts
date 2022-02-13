type IFilterable = {
  status: {
    title: string;
    values: { id: number; title: string }[];
  };
};

export default IFilterable;
