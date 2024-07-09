import React from "react";
import { Location } from "@/types/Location";
var S2 = require("s2-geometry").S2;

export const getCell_Ids: React.FC<Location> = ({ latitude, longitude }) => {
  try {
    const regions: String[] = [];
    //get key of current cell(location)
    var key = S2.latLngToKey(latitude, longitude, 14);
    //push current cell id in array
    regions.push(S2.keyToId(key).toString());

    //push next 15 and previous cell ids
    for (let i = 1; i <= 15; i++) {
      regions.push(S2.keyToId(S2.stepKey(key, i)).toString());
      regions.push(S2.keyToId(S2.stepKey(key, -i)).toString());
    }

    return regions;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getS2Id: React.FC<Location> = async ({ latitude, longitude }) => {
  try {
    const send = await S2.keyToId(S2.latLngToKey(latitude, longitude, 14)).toString();
    return send;
  } catch (error) {
    console.log(error);
    return null;
  }
};
