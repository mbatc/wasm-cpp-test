# About

This project uses the WASM ROS2 packages available on the [robostack-wasm](https://repo.mamba.pm/robostack-wasm) conda channel to build a jupyterlite notebook that has contains ROS2 and it can be interacted via rclpy python package.

The WASM ROS2 packages are built by a fork of [RoboStack](https://github.com/RoboStack/ros-humble) (see https://github.com/mbatc/ros-humble). The builds are automated using a fork of [Vinca](https://github.com/RoboStack/vinca) (see https://github.com/mbatc/ros-humble) that has been modified to add `emscripten-wasm32` as a target platform.

To support Web Assembly, ROS2 is compiled with the [rmw_wasm](https://github.com/ros2wasm/rmw_wasm) middleware. This project is based on a fork of rmw_wasm (see https://github.com/mbatc/rmw_wasm) that uses [roslibjs](https://wiki.ros.org/roslibjs) to enable communication with native Nodes. Currently the rosbridge_server must be running locally for everything to work correctly. A WASM only version of rmw_wasm, but has not been integrated at this stage (see Limitations for more info)

> Building is only supported on Linux right now.

# Setup

> You'll need micromamba installed on your machine to build this project (see https://mamba.readthedocs.io/en/latest/installation/micromamba-installation.html).

1. Clone this repo (`git clone https://github.com/mbatc/wasm-cpp-test.git`)
2. Install [bash-builder](https://github.com/mbatc/bash-builder) utility script.

```sh
mkdir -p ~/.local/bin | curl https://raw.githubusercontent.com/mbatc/bash-builder/main/bash-builder>~/.local/bin/bash-builder | chmod u+x ~/.local/bin/bash-builder
```
3. `cd` into the wasm-cpp-test directory.
3. Run `bash-builder . setup.sh` to setup dependencies and create micromamba environments.
4. Run `bash-builder . build.sh` to build and pack the site.
5. Run `python -m http.server --directory dist`  to host the jupyterlite page at `http://localhost:8000`
6. `RosTest.ipynb` is an example python script that creates a publisher/subscriber in jupyterlite.

# Connect to Native Nodes

In your native environment, you can use RoboStack in install a desktop version of ROS2 (see https://robostack.github.io/GettingStarted.html - I recommend following the steps for micromamba). To allow jupyterlite to connect to your ROS package you will need to use rosbridge_suite. To install an start rosbridge_suite you need to,

1. install the server package with `micromamba install ros-humble-rosbridge-server`
2. install the server package with `micromamba install ros-humble-rosbridge-suite`
3. run the server with `ros2 run rosbridge_server rosbridge_websocket`
4. run the rosapi node with `ros2 run rosapi rosapi_node`

Then run the nodes in your ros2 system, for example to run native publisher example use `ros2 run examples_rclpy_minimal_publisher publisher_local_function`

You can find more information about rosbridge_suite [here](https://wiki.ros.org/rosbridge_suite).

# Limitations

The `RosTest.ipynb` script needs to runs some javascript with pjys before an rclpy context can be created. This JavaScript imports the `pre.js` from rmw_wasm and `roslib.js` scripts as rmw_wasm depends on these. It would be nice if we could get jupyterlite to import these scripts into the kernel automatically (or somehow add these as dependencies via some mechanism in emscripten? I think the use of sharedlibs complicates this slightly).

My rmw_wasm fork only implements a code path that uses roslibjs and requires a rosbridge_server to be running to function. The hostname is hardcoded to `ws:\\localhost:9090`. A method to connect to a specific server should be added to remove this. Additionally, a fallback implementation is needed so that the WASM nodes can still communicate when not connected to a rosbridge_server.
