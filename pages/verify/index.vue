<template>
  <div class="verify-form">
    <div class="verify-form__top">Ваш email изменен</div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
definePageMeta({
  middleware: 'authenticated',
});

const verifyEmail = async () => {
  const { data, error } = await apiFetch<ApiResponse<any>>(
    `/api/users/verify_email`,
    {
      options: {
        method: 'POST',
        body: {
          verificationToken: route.query?.verificationToken,
          email: route.query?.email,
        },
      },
      needToken: true,
    },
  );
  if (data?.value?.status) {
    //router.push('/profile/settings');
  }
  if (error.value) {
    useToast({ message: 'Произошла ошибка', type: 'error' });
    router.push('/');
  }
};

verifyEmail();
</script>
