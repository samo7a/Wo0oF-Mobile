import { RNS3 } from "react-native-aws3";
import { Alert } from "react-native";
const UploadImage = async (response, id) => {
  var uploadSuccessMessage = "";
  RNS3.put(
    {
      uri: response.uri,
      name: id,
      type: response.type,
    },
    {
      bucket: "wo0of",
      region: "us-east-1",
      accessKey: "AKIA5GXICN4MT7PM7ZNX",
      secretKey: "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",
      successActionStatus: 201,
    }
  )
    .progress(
      (progress) =>
        (uploadSuccessMessage = `Uploading: ${
          progress.loaded / progress.total
        } (${progress.percent}%)`)
    )
    .then(async (response1) => {
      if (response1.status !== 201)
        Alert.alert("Failed to upload profile picture!");
      console.log(response1.body);
      var { bucket, etag, key, location } = await response1.body.postResponse;
      uploadSuccessMessage = `Uploaded Successfully: 
        \n1. bucket => ${bucket}
        \n2. etag => ${etag}
        \n3. key => ${key}
        \n4. location => ${location}`;
      //return location;
      /**
       * {
       *   postResponse: {
       *     bucket: "your-bucket",
       *     etag : "9f620878e06d28774406017480a59fd4",
       *     key: "uploads/image.png",
       *     location: "https://bucket.s3.amazonaws.com/**.png"
       *   }
       * }
       */
    });
};
export default UploadImage;
