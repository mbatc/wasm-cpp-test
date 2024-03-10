import os
os.environ["ROS_DOMAIN_ID"]="0"

import rclpy
from rclpy.utilities import get_default_context
from rclpy.signals import SignalHandlerOptions
from rclpy.signals import install_signal_handlers
from rclpy.node import Node
from std_msgs.msg import String

context = get_default_context()
context.init(args=None, domain_id=None)
context.ok()
node = rclpy.create_node('minimal_publisher', context=context, use_global_arguments=False, start_parameter_services=True)
publisher = node.create_publisher(String, 'topic', 10)
msg = String()
msg.data = 'Hello World'
publisher.publish(msg)

class MinimalSubscriber(Node):
  def __init__(self):
    super().__init__('minimal_subscriber_test')
    self.subscription = self.create_subscription(
      String,
      'topic',
      self.listener_callback,
      10)
    self.subscription  # prevent unused variable warning

  def listener_callback(self, msg):
    print('I heard: "%s"' % msg.data)

minimal_subscriber = MinimalSubscriber()
rclpy.spin(minimal_subscriber)
