import Avatar, { genConfig } from "@zamplyy/react-native-nice-avatar";

import { useUser } from "../providers/hooks";

export default function UserAvatar({ avatarProps, size = 200 }) {
  const { user } = useUser();

  return (
    <Avatar
      style={{ height: size, width: size }}
      {...genConfig(
        avatarProps ? avatarProps : user.avatar ? user.avatar : user.username
      )}
    />
  );
}
