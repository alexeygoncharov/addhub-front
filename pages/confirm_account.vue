<template>
  <div class="verify-form">
    <div class="verify-form__top">Ваша учетная запись подтверждена</div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const verifyEmail = async () => {
  const { data, error } = await apiFetch<ApiResponse<any>>(
    `api/auth/confirm_account`,
    {
      options: {
        method: 'POST',
        query: {
          verificationToken: route.query?.verificationToken,
          email: route.query?.email,
        },
      },
      needToken: true,
    },
  );
  if (data?.value?.status) {
    authStore.saveToken(data.value.result, true);
    // router.push('/profile/settings');
  }
  if (error.value) {
    useToast({ message: 'Произошла ошибка', type: 'error' });
    // router.push('/');
  }
};

verifyEmail();
</script>
