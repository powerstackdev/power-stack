"use server"

import { revalidatePath } from 'next/cache';

export const triggerRevalidation = async (path) => {
  const revalidateUrl = `/${path}`;
  const revalidateEditUrl = `/edit/[...puckPath]`;

  try {
    await revalidatePath(revalidateUrl, 'page'); // Assuming revalidatePath is an async operation
    console.log("Page revalidated");

    await revalidatePath(revalidateEditUrl, 'page');
    console.log("Edit page revalidated");

    return "Both pages revalidated successfully"; // Resolving the promise with a success message
  } catch (error) {
    console.error("Error triggering revalidation:", error);
    throw error; // Rejecting the promise with the caught error
  }
};