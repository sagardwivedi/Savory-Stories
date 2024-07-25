import { toast } from '@/components/ui/use-toast';
import { useCallback } from 'react';

const useCustomToast = () => {
  const showToast = useCallback(
    (title: string, description: string, status: 'success' | 'error') => {
      toast({
        title,
        description,
        variant: status === 'success' ? 'default' : 'destructive',
      });
    },
    [],
  );

  return showToast;
};

export default useCustomToast;
