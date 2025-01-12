// Directive indicating that this file runs server-side in a server-side rendering (SSR) context
"use server";

// Importing Prisma instance for database operations and utility to get user ID
import prisma from "@/lib/prisma";
import { getDbUserId } from "./user.action";

/**
 * Fetch notifications for the logged-in user.
 * Includes details about the creator, related post, and any associated comment.
 */
export async function getNotifications() {
  try {
     // Retrieve the database ID of the currently logged-in user
    const userId = await getDbUserId();
    if (!userId) return []; // Return an empty array if no user ID is found

     // Query notifications for the user, including creator, post, and comment details
    const notifications = await prisma.notification.findMany({
      where: {
        userId, // Fetch notifications specific to the user
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true, // Include details of the creator of the notification
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            image: true, // Include details of the related post
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true, // Include details of the related comment
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Order notifications by their creation time (most recent first)
      },
    });

    return notifications; // Return the fetched notifications
  } catch (error) {
    console.error("Error fetching notifications:", error); // Log any errors
    throw new Error("Failed to fetch notifications"); // Throw a user-friendly error
  }
}

/**
 * Mark specified notifications as read.
 * Accepts an array of notification IDs and updates their 'read' status.
 */
export async function markNotificationsAsRead(notificationIds: string[]) {
  try {
     // Update the 'read' status of the specified notifications
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,  // Target notifications with matching IDs
        },
      },
      data: {
        read: true, // Set 'read' status to true
      },
    });

    return { success: true }; // Indicate successful operation
  } catch (error) {
    console.error("Error marking notifications as read:", error); // Log any errors
    return { success: false };  // Return a failure response
  }
}