import type { Review } from '~/types/profile.type';

export const useReviewsStore = defineStore('reviews', () => {
  const updateMyReviews = async () => {
    const { data } = await apiFetch<ApiListResponse<Review[]>>(
      '/api/reviews/my',
      {
        needToken: true,
      },
    );
    const value = data.value;
    if (value?.status === 200) {
      return value.result;
    }
  };

  return { updateMyReviews };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReviewsStore, import.meta.hot));
}
