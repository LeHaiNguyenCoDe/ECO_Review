import ResponseMdl from "@/models/https/response";
import { revalidatePath } from "next/cache";
import { generateReadableErr } from "./core";
import { ClientError } from "@/models/errors/client-err";

/**
 * Converts a string to a URL-friendly format.
 *
 * @param string - The string to be converted.
 * @returns The converted URL string.
 */
const convertToURL = (str: string): string => {
  const stringWithHyphens = str.toLocaleLowerCase().replace(/\s+/g, "-");
  const stringWithoutSpecialCharacters = stringWithHyphens
    .replace(/(?<![a-zA-Z])[0-9%]+/g, "")
    .replace(/-+/g, "-")
    .replace("&", "and");

  const url =
    stringWithoutSpecialCharacters.charAt(0) === "-"
      ? stringWithoutSpecialCharacters.substring(1)
      : stringWithoutSpecialCharacters;

  return url;
};

/**
 * Fetches data from the specified URL, convert it into specific response model (T type) and handles error cases.
 *
 * @param url - The URL to fetch the data from.
 * @param T - type of responded data
 * @returns A promise that resolves to the fetched data or an empty `ResponseMdl` object.
 */
const safeDataFetching = async <T>(
  url: string,
  needRevalidate?: boolean
): Promise<T | undefined> => {
  if (needRevalidate) {
    revalidatePath(url);
  }
  const ret: ResponseMdl<T> = await fetch(url, {
    headers: {
      "ConTent-Type": "application/json",
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        throw generateReadableErr(res.status, {
          msg: res.statusText,
          info: await res.text(),
        });
      }
      return res.text();
    })
    .then((data) => JSON.parse(data))
    .catch((err: Error) => {
      throw new ClientError(err.cause as string, err.stack);
    });

  if (!isResOK(ret.status)) {
    throw generateReadableErr(ret.status, {
      msg: ret.message,
      info: String(ret.data),
    });
  }

  return ret.data;
};

/**
 * Checks if the HTTP response status is OK (200).
 *
 * @param response - The HTTP response object.
 * @returns True if the response status is OK, false otherwise.
 */
const isResOK = (res: number): boolean => {
  return res >= 200 && res < 300;
};

/**
 * Sends a POST request to the specified URL with the provided data, convert the response into specific response model (T type) and handles error cases.
 *
 * @param url - The URL to send the request to.
 * @param data - The data to send in the request body.
 * @param T - The type of the response data.
 * @param D - The type of the client data which will be sent to server.
 * @returns A promise that resolves to the response data or an empty `ResponseMdl` object.
 */
const safePostRequest = async <T, D extends Record<string, unknown>>(
  url: string,
  data: D
): Promise<T | undefined> => {
  const ret: ResponseMdl<T> = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (!res.ok) {
        throw generateReadableErr(res.status, {
          msg: res.statusText,
          info: await res.text(),
        });
      }
      return res.text();
    })
    .then((responseData) => JSON.parse(responseData))
    .catch((err: Error) => {
      throw new ClientError(err.cause as string, err.stack);
    });

  if (!isResOK(ret.status)) {
    throw generateReadableErr(ret.status, {
      msg: ret.message,
      info: String(ret.data),
    });
  }

  return ret.data;
};

export { convertToURL, safeDataFetching, isResOK, safePostRequest };
