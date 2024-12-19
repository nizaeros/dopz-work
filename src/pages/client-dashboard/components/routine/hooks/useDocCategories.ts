import { useState, useEffect } from 'react';
import { docCategoryService } from '../../../../../services/doc-category/doc-category.service';
import type { DocCategory } from '../../../../../services/doc-category/types';

export function useDocCategories() {
  const [categories, setCategories] = useState<DocCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await docCategoryService.getDocCategories();
        setCategories(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch categories';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
}