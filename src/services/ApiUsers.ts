import {
  UserApi,
  UserControllerGetUserRoleRequest,
  UserControllerGetUserProfileRequest,
} from './api/apis/UserApi';
import { AppUserRolesResponse, AppUserProfileResponse } from './api/models';
import ApiConfigStore from './ApiConfigStore';
import { Configuration } from './api/runtime';

export async function getUserRole(
  userID: number
): Promise<AppUserRolesResponse> {
  const apiConfig: Configuration = ApiConfigStore.getApiConfig();
  const userApi = new UserApi(apiConfig);
  const request: UserControllerGetUserRoleRequest = {
    userID,
  };

  return userApi.userControllerGetUserRole(request);
}

export async function getUserProfile(
  userID: number
): Promise<AppUserProfileResponse> {
  const apiConfig: Configuration = ApiConfigStore.getApiConfig();
  const userApi = new UserApi(apiConfig);
  const request: UserControllerGetUserProfileRequest = {
    userID,
  };

  return userApi.userControllerGetUserProfile(request);
}
