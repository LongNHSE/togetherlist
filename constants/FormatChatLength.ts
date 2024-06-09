export const formatChatLength = (messageContent: string): string => {
  if (messageContent.length > 40) {
    return messageContent.substring(0, 40) + '...';
  } else {
    return messageContent;
  }
};
