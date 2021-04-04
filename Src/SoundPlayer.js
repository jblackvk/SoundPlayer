import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";
import SoundPlayer from "react-native-sound-player";
import Slider from '@react-native-community/slider'
import { Colors, Button, IconButton } from "react-native-paper";

export default class SoundPlayers extends React.Component {


  _onFinishedPlayingSubscription = null;

  constructor(props) {
    super(props);

    this.state = {
      url: "https://qoran-app.s3.us-east-2.amazonaws.com/uploads/15 - Lefa - Seul.mp3",
      loading: false,
      position: 0,
      playing: false,
      pause: false,
      duration: 0,
    };
    this.secondPlay = 0;

  }

  async componentDidMount() {
    console.log("playing");
    setTimeout( this.playSound, 1000)
  }

  UNSAFE_componentWillUnmount() {
    this._onFinishedPlayingSubscription.remove();
    console.log("unmount");

  }

  playSound = async () => {
    await this.setState({
        playing: true,
      },
    );
    try {
      console.log("play push");
      SoundPlayer.playUrl(this.state.url);
      SoundPlayer.getInfo().then((value) => {
        this.setState({
          duration: value,
        });
      });

      let interval = setInterval(() => {
        SoundPlayer.getInfo().then((value) => {
          this.secondPlay ++;
          this.setState({
            position: value.currentTime/value.duration,
          });
        });
      }, 10000 )

      this._onFinishedPlayingSubscription = SoundPlayer.addEventListener(
        "FinishedPlaying", () => {

        clearInterval(interval)
        this.setState({
          playing: false,
          pause: false,
          position: 0,
        })
      })
      console.log("play end");
    } catch (e) {
      alert("Cannot play the file");
    }
    this.setState({
        playing: true,
      },
    );
  }

  pause = () => {
    this.setState({
      pause: true,
    });
    SoundPlayer.pause();
  }

  resume = () => {
    this.setState({
      playing: true,
    });
    SoundPlayer.resume();
  }

  seek = (position: number) => {
    SoundPlayer.seek(position * this.state.duration);
  }

  async replay() {
    this.stop();
    await this.playSound();
  }

  stop = () => {
    this.setState({
      pause: false,
      playing: false,
      position: 0,
    });
    SoundPlayer.stop();
  }

  iconColor = Colors.grey300;
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.principal}>
          <Text>Sound</Text>
          <IconButton
            style={styles.bigIcon}
            size={200}
            color={Colors.blue500}
            animated={true}
            icon="music"
          />
        </View>
        <View style={[styles.second]}>
          <Slider
            value={this.state.position}
            minimumTrackTintColor={Colors.white}
            maximumTrackTintColor={Colors.grey500}
            onValueChange={
              (value) => {
                console.log(value);
                this.seek(value);
              }
            }

            onComplete={
              () => {
                this.setState({
                  position: 0,
                })
              }
            }
          />
          <View style={styles.alignH}>
            <IconButton
              icon={"replay"}
              size={40}
              color={this.iconColor}
              style={styles.miniIcon}
              onPress={
                async () => {
                  await this.replay();
                }
              }
            />
            <IconButton
              icon={this.state.playing ? "pause-circle-outline": "play-circle-outline" }
              color={this.iconColor}
              style={styles.miniIcon}
              size={55}
              onPress={
                 () => {
                  if (this.state.playing) {
                    if (this.state.pause) {
                      this.resume();

                    } else {
                      this.pause();
                    }
                  } else {
                    this.playSound();
                  }
                }
              }
            />

            <IconButton
              icon={"stop"}
              size={40}
              color={this.iconColor}
              style={styles.miniIcon}
              onPress={
                () => {
                  this.resume();
                }
              }
            />
          </View>
        </View>
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: Colors.black,
  },
  principal: {
    flex: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  second: {
    margin: 10,
    flex: 2,
  },
  alignH: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  miniIcon: {
    marginLeft: 15,
    marginRight: 15
  },
  bigIcon: {
    height: 200,
    width: 200,
    color: Colors.yellow600
  },
  playButton: {},

});
