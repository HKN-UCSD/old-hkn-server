/* tslint:disable */
/* eslint-disable */
/**
 * HKN API
 * HKN API
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface AppUserInducteePointsResponse
 */
export interface AppUserInducteePointsResponse {
  /**
   *
   * @type {number}
   * @memberof AppUserInducteePointsResponse
   */
  user: number;
  /**
   *
   * @type {number}
   * @memberof AppUserInducteePointsResponse
   */
  points: number;
  /**
   *
   * @type {boolean}
   * @memberof AppUserInducteePointsResponse
   */
  hasProfessionalRequirement: boolean;
  /**
   *
   * @type {boolean}
   * @memberof AppUserInducteePointsResponse
   */
  hasMentorshipRequirement: boolean;
}

export function AppUserInducteePointsResponseFromJSON(
  json: any
): AppUserInducteePointsResponse {
  return AppUserInducteePointsResponseFromJSONTyped(json, false);
}

export function AppUserInducteePointsResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): AppUserInducteePointsResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    user: json['user'],
    points: json['points'],
    hasProfessionalRequirement: json['hasProfessionalRequirement'],
    hasMentorshipRequirement: json['hasMentorshipRequirement'],
  };
}

export function AppUserInducteePointsResponseToJSON(
  value?: AppUserInducteePointsResponse | null
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    user: value.user,
    points: value.points,
    hasProfessionalRequirement: value.hasProfessionalRequirement,
    hasMentorshipRequirement: value.hasMentorshipRequirement,
  };
}
