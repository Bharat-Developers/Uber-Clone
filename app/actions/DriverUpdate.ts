import mongoose from "mongoose";

const nottheone = '1152921508901814272'

export const UpdateDriverLocation = async (
  current_cell_id: string,
  prev_cell_id: string,
  driver_id: mongoose.Types.ObjectId,
  GO: boolean
) => {
  // Check if either current_cell_id or prev_cell_id is equal to nottheone
  if (current_cell_id.toString() === nottheone.toString() || prev_cell_id.toString() === nottheone.toString()) {
    console.log("Current or previous cell ID is not the one, function not executed.");
    return; // Exit the function without executing further code
  }

  if (current_cell_id !== prev_cell_id) {
    try {
      const actions = [
        {
          cell_id: prev_cell_id,
          driver_id: driver_id.toString(),
          action: "pull",
        },
        {
          cell_id: current_cell_id,
          driver_id: driver_id.toString(),
          action: "push",
        },
      ];

      for (const action of actions) {
        const response = await fetch("/api/AvaliableDrivers", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(action),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to ${action.action} driver in cell ${action.cell_id}: ${errorText}`
          );
        }
      }

      console.log("Driver location updated successfully");
    } catch (error) {
      console.error("Error in UpdateDriverLocation function:", error);
      throw error;
    }
  } else {
    try {
      const action = GO ? "push" : "pull";
      const response = await fetch("api/AvaliableDrivers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cell_id: prev_cell_id,
          driver_id: driver_id.toString(),
          action: action,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to ${action} driver in cell ${prev_cell_id}: ${errorText}`
        );
      }
      console.log("Driver location updated successfully");
    } catch (error) {
      console.error("Error in UpdateDriverLocation function:", error);
      throw error;
    }
  }
};
