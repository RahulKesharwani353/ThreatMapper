import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getDiagnosisApiClient, getSettingsApiClient, getUserApiClient } from '@/api/api';
import { get403Message } from '@/utils/403';
import { apiWrapper } from '@/utils/api';

export const settingQueries = createQueryKeys('setting', {
  listScheduledJobs: () => {
    return {
      queryKey: ['listScheduledJobs'],
      queryFn: async () => {
        const getScheduledTasks = apiWrapper({
          fn: getSettingsApiClient().getScheduledTasks,
        });

        const response = await getScheduledTasks();

        if (!response.ok) {
          if (response.error.response.status === 403) {
            const message = await get403Message(response.error);
            return {
              message,
            };
          }
          throw response.error;
        }
        return {
          data: response.value,
        };
      },
    };
  },
  listUserActivityLogs: () => {
    return {
      queryKey: ['listUserActivityLogs'],
      queryFn: async () => {
        const userApi = apiWrapper({
          fn: getSettingsApiClient().getUserActivityLogs,
        });
        const userResponse = await userApi();
        if (!userResponse.ok) {
          if (userResponse.error.response.status === 400) {
            return {
              message: userResponse.error.message,
            };
          } else if (userResponse.error.response.status === 403) {
            const message = await get403Message(userResponse.error);
            return {
              message,
            };
          }
          throw userResponse.error;
        }

        return {
          data: userResponse.value,
        };
      },
    };
  },
  listGlobalSettings: () => {
    return {
      queryKey: ['listGlobalSettings'],
      queryFn: async () => {
        const settingsApi = apiWrapper({
          fn: getSettingsApiClient().getSettings,
        });
        const settingsResponse = await settingsApi();
        if (!settingsResponse.ok) {
          if (settingsResponse.error.response.status === 400) {
            return {
              message: settingsResponse.error.message,
            };
          } else if (settingsResponse.error.response.status === 403) {
            const message = await get403Message(settingsResponse.error);
            return {
              message,
            };
          }
          throw settingsResponse.error;
        }

        return {
          data: settingsResponse.value,
        };
      },
    };
  },
  getEmailConfiguration: () => {
    return {
      queryKey: ['getEmailConfiguration'],
      queryFn: async () => {
        const emailApi = apiWrapper({
          fn: getSettingsApiClient().getEmailConfiguration,
        });
        const emailResponse = await emailApi();
        if (!emailResponse.ok) {
          if (
            emailResponse.error.response.status === 400 ||
            emailResponse.error.response.status === 409
          ) {
            return {
              message: emailResponse.error.message,
            };
          } else if (emailResponse.error.response.status === 403) {
            const message = await get403Message(emailResponse.error);
            return {
              message,
            };
          }
          throw emailResponse.error;
        }

        return {
          data: emailResponse.value,
        };
      },
    };
  },
  listUsers: () => {
    return {
      queryKey: ['listUsers'],
      queryFn: async () => {
        const getUsers = apiWrapper({ fn: getUserApiClient().getUsers });
        const users = await getUsers();

        if (!users.ok) {
          if (users.error.response?.status === 403) {
            const message = await get403Message(users.error);
            return {
              error: {
                message,
              },
            };
          }
          throw users.error;
        }

        return {
          data: users.value,
        };
      },
    };
  },
  listDiagnosticLogs: () => {
    return {
      queryKey: ['listDiagnosticLogs'],
      queryFn: async () => {
        const getDiagnosticLogs = apiWrapper({
          fn: getDiagnosisApiClient().getDiagnosticLogs,
        });
        const response = await getDiagnosticLogs();

        if (!response.ok) {
          if (response.error.response.status === 403) {
            const message = await get403Message(response.error);
            return {
              message,
            };
          }
          throw response.error;
        }

        return {
          data: response.value,
        };
      },
    };
  },
  productVersion: () => {
    return {
      queryKey: ['productVersion'],
      queryFn: async () => {
        const data = await fetch(`${window.location.origin}/product_version.txt`);
        const version = await data.text();
        return {
          version,
        };
      },
    };
  },
});
