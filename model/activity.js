import {Http} from "../utils/http";

class Activity {
  static activityD = 'a-2';

  static async getLocationD() {
    return Http.request({
      url: `activity/name/${Activity.activityD}`
    })
  }
}

export {
  Activity
}
