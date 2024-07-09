import cookie from 'cookie'
const nottheone = '1152921508901814272'

export const UpdateDriverLocation = async (
  current_cell_id: string,
  prev_cell_id: string,
  GO: boolean
) => {
  // Check if either current_cell_id or prev_cell_id is equal to nottheone
  if (current_cell_id.toString() === nottheone.toString() || prev_cell_id.toString() === nottheone.toString()) {
    console.log("Current or previous cell ID is not the one, function not executed.");
    return; // Exit the function without executing further code
  }
  const cookies = cookie.parse(document.cookie);
  if (current_cell_id !== prev_cell_id) {
    try {
      const actions = [
        {
          cell_id: prev_cell_id,
          action: "pull",
        },
        {
          cell_id: current_cell_id,
          action: "push",
        },
      ];
      
      for (const action of actions) {
        const response = await fetch("localhost:5001/api/availableDriver", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": cookies.Dtoken
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
      const response = await fetch("localhost:5001/api/avaliableDriver", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": cookies.Dtoken
        },
        body: JSON.stringify({
          cell_id: prev_cell_id,
          action: action,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to ${action} driver in cell ${prev_cell_id}: ${errorText}`
        );
      }else
      console.log("Driver location updated successfully");
    } catch (error) {
      console.error("Error in UpdateDriverLocation function:", error);
      throw error;
    }
  }
};
