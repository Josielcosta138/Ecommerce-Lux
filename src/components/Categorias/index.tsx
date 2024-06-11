import { useEffect, useState } from "react";
import { IProduto } from "../../pages/Home/types";
import { STATU_CODE, apiGet } from "../../api/RestClient";

const useProducts = (category: string) => {
  const [products, setProducts] = useState<IProduto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await apiGet(`/produtos/categoria/${category}`);
      if (response.status === STATU_CODE.OK) {
        setProducts(response.data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  return { products, loading };
};

export default useProducts;
