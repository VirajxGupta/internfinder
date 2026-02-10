import { db } from "../firebaseAdmin.js";

// Apply for an Internship
export const applyForInternship = async (req, res) => {
    try {
        const { userId, internshipId, title, company, status = "Applied", location, stipend } = req.body;

        if (!userId || !internshipId) {
            return res.status(400).json({ message: "User ID and Internship ID are required." });
        }

        const applicationData = {
            userId,
            internshipId,
            title,
            company,
            location,
            stipend,
            status,
            appliedOn: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await db.collection("applications").add(applicationData);

        res.status(201).json({
            id: docRef.id,
            ...applicationData,
            message: "Application submitted successfully!"
        });
    } catch (error) {
        console.error("Error applying for internship:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get User's Applications
export const getUserApplications = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const snapshot = await db.collection("applications").where("userId", "==", userId).get();

        if (snapshot.empty) {
            return res.status(200).json([]);
        }

        const applications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get Application Stats
export const getApplicationStats = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const snapshot = await db.collection("applications").where("userId", "==", userId).get();

        const stats = {
            active: 0,
            saved: 0, // Assuming we track saved separately, but for now we'll count 'Applied' as active
            interviews: 0
        };

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.status === 'Applied' || data.status === 'In Review') {
                stats.active += 1;
            }
            if (data.status === 'Saved') {
                stats.saved += 1;
            }
            if (data.status === 'Interview') {
                stats.interviews += 1;
            }
        });

        res.status(200).json(stats);
    } catch (error) {
        console.error("Error fetching stats:", error);
        res.status(500).json({ message: error.message });
    }
};

// Unsave Internship
export const unsaveInternship = async (req, res) => {
    try {
        const { userId, internshipId } = req.body;

        if (!userId || !internshipId) {
            return res.status(400).json({ message: "User ID and Internship ID are required." });
        }

        const snapshot = await db.collection("applications")
            .where("userId", "==", userId)
            .where("internshipId", "==", internshipId)
            // .where("status", "==", "Saved") // Optional: strictly delete only if Saved, but user likely wants to remove any interaction if they click unsave? No, usually unsave just removes the save.
            // Let's stick to removing where status is Saved to be safe, so we don't accidentally delete an Application if they click unsave on a bugged UI.
            .where("status", "==", "Saved")
            .get();

        if (snapshot.empty) {
            return res.status(404).json({ message: "Saved internship not found." });
        }

        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        res.status(200).json({ message: "Internship unsaved successfully." });
    } catch (error) {
        console.error("Error unsaving internship:", error);
        res.status(500).json({ message: error.message });
    }
};
