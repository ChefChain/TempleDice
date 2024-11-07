/// <reference types="react" />
export interface AudioPlayerProps {
}
export interface AudioPlayerProps {
    play?: boolean;
    reverse?: boolean;
    size?: string | number;
    prefix?: string;
    className?: string;
}
declare const AudioPlayer: (props: AudioPlayerProps) => JSX.Element;
export { AudioPlayer };
