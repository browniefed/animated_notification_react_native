import React, { Component } from "react";
import {
  AppRegistry,
  Animated,
  Easing,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class animated_notification extends Component {
  state = {
    value: "",
    notification: "",
    animation: new Animated.Value(0),
    offset: new Animated.Value(0),
  };
  handlePress = () => {
    this.setState(
      {
        value: "",
        notification: this.state.value,
      },
      () => {
        this._notification.measure((x, y, width, height, pageX, pageY) => {
          this.state.offset.setValue(height * -1);

          Animated.sequence([

            Animated.parallel([
              Animated.timing(this.state.animation, {
                toValue: 1,
                duration: 300,
              }),
              Animated.timing(this.state.offset, {
                toValue: 0,
                duration: 300,
              }),
            ]),

            Animated.delay(1500),

            Animated.parallel([
              Animated.timing(this.state.animation, {
                toValue: 0,
                duration: 300,
              }),
              Animated.timing(this.state.offset, {
                toValue: height * -1,
                duration: 300,
              }),
            ]),

          ]).start();
        });
      }
    );
  };
  render() {
    const notificationStyle = {
      opacity: this.state.animation,
      transform: [
        {
          translateY: this.state.offset,
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.notification, notificationStyle]}>
          <View ref={notification => this._notification = notification}>
            <Text style={styles.notificationText}>
              {this.state.notification}
            </Text>
          </View>
        </Animated.View>

        <View>
          <TextInput
            style={styles.input}
            value={this.state.value}
            onChangeText={value => this.setState({ value })}
          />
          <TouchableOpacity onPress={this.handlePress}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Show Notification</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notification: {
    position: "absolute",
    paddingHorizontal: 7,
    paddingVertical: 15,
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: "tomato",
  },
  notificationText: {
    color: "#FFF",
  },
  button: {
    backgroundColor: "tomato",
    padding: 15,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
  },
  input: {
    width: 250,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: "#CCC",
  },
});

AppRegistry.registerComponent(
  "animated_notification",
  () => animated_notification
);
