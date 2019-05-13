import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  // Request body is passed in as a JSON encoded string in 'event.body'

  const params = {
    TableName: "restaurant-meetup-users",
    Key: {

    }
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    return success(result);
    } catch (e) {
      console.log(e)
      return failure({ status: false });
    }
}
