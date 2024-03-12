import os
os.environ["ROS_DOMAIN_ID"]="0"

import asyncio
import pyjs
import rclpy

from rclpy.utilities import get_default_context
from rclpy.signals import SignalHandlerOptions
from rclpy.signals import install_signal_handlers
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
  def __init__(self, name, topics):
    super().__init__(name)
    self._subs = [self.create_subscription(
      String,
      topic,
      self.listener_callback,
      10) for topic in topics]
    self._subs  # prevent unused variable warning
    self._name = name

  def listener_callback(self, msg):
    pyjs.js.console.log(self._name + " heard: \"" + msg.data + "\"")

async def spin_subscriber(sub):
  while True:
    rclpy.spin_once(sub, timeout_sec=0)
    await asyncio.sleep(0.01)

async def publish_messages(pub, text):
  count = 0
  while True:
    msg = String()
    msg.data = text + str(count)
    count = count + 1
    pub.publish(msg)
    await asyncio.sleep(1)

context = get_default_context()
context.init(args=None, domain_id=None)
context.ok()

node = rclpy.create_node('minimal_publisher', context=context, use_global_arguments=False, start_parameter_services=True)

try:
  pub_a = node.create_publisher(String, 'topic_a', 10)
  pub_b = node.create_publisher(String, 'topic_b', 10)
  sub_1 = MinimalSubscriber('minimal_subscriber_test', ['topic_a', 'topic_b'])
  sub_2 = MinimalSubscriber('minimal_subscriber_test_a', ['topic_b'])
except Exception as e:
  import traceback
  pyjs.js.console.log('\n'.join(traceback.format_exception(e)))

asyncio.create_task(publish_messages(pub_a, 'Hello From A '))
asyncio.create_task(publish_messages(pub_b, 'Hello From B '))
asyncio.create_task(spin_subscriber(sub_1))
asyncio.create_task(spin_subscriber(sub_2))
