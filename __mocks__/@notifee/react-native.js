const notifee = {
    displayNotification: jest.fn(),
    requestPermission: jest.fn().mockResolvedValue(true),
    createChannel: jest.fn().mockResolvedValue('mockChannelId'),
    createTriggerNotification: jest.fn().mockResolvedValue(undefined),
    cancelNotification: jest.fn()
  };
  
 
const AndroidImportance = {
  HIGH: 4,
  // Adicione outros níveis se necessário
};

const TriggerType = {
  TIMESTAMP: 'timestamp',
  // Adicione outros tipos se necessário
};

export default notifee;
export { AndroidImportance, TriggerType };