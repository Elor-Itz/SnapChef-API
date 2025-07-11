import express from "express";
import { authenticate } from "../../middlewares/auth";
import friendsController from "./friendsController";

const router = express.Router();

/**
 * @swagger
 * /api/users/friends:
 *   get:
 *     summary: Get the current user's friends list
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of friends
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticate, friendsController.getFriends);

/**
 * @swagger
 * /api/users/friends/requests:
 *   get:
 *     summary: Get pending friend requests for the current user
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending friend requests
 *       401:
 *         description: Unauthorized
 */
router.get("/requests", authenticate, friendsController.getFriendRequests);

/**
 * @swagger
 * /api/users/friends/requests/{id}:
 *   post:
 *     summary: Send a friend request to a user
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to send a friend request to
 *     responses:
 *       201:
 *         description: Friend request sent
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/requests/:id", authenticate, friendsController.sendFriendRequest);

/**
 * @swagger
 * /api/users/friends/requests/{requestId}/cancel:
 *   delete:
 *     summary: Cancel a pending friend request (sender only)
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the friend request to cancel
 *     responses:
 *       200:
 *         description: Friend request cancelled
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not found
 */
router.delete("/requests/:requestId/cancel", authenticate, friendsController.cancelFriendRequest);

/**
 * @swagger
 * /api/users/friends/requests/{requestId}/accept:
 *   post:
 *     summary: Accept a friend request
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the friend request
 *     responses:
 *       200:
 *         description: Friend request accepted
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.post("/requests/:requestId/accept", authenticate, friendsController.acceptFriendRequest);

/**
 * @swagger
 * /api/users/friends/requests/{requestId}/decline:
 *   post:
 *     summary: Decline a friend request
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: requestId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the friend request
 *     responses:
 *       200:
 *         description: Friend request declined
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
router.post("/requests/:requestId/decline", authenticate, friendsController.declineFriendRequest);

/**
 * @swagger
 * /api/users/friends/{friendId}:
 *   delete:
 *     summary: Remove a friend from the current user's friends list
 *     tags: [Friends]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: friendId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the friend to remove
 *     responses:
 *       200:
 *         description: Friend removed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Failed to remove friend
 */
router.delete("/:friendId", authenticate, friendsController.removeFriend);

export default router;