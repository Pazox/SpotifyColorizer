const VALENCE_FACTOR = 1.29

class colorObj {
    constructor(red, green, blue) {
        this.r = red
        this.g = green
        this.b = blue
    }

    rgbToHex() {
        return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
    }

    toString() {
        return 'rgb(' + this.r + ',' + this.g + ',' + this.b +')'
    }

    toStringAlpha(alpha) {
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + alpha +')'
    }
}

/**
 *
 * @param danceability - 0 to 1
 * @param energy 0 to 1
 * @param loudness -60 to 0 (dB)
 * @param speechiness 0 to 1
 * @param acousticness 0 to 1
 * @param instrumentalness 0 to 1
 * @param liveness 0 to 1 (informs of live audience)
 * @param valence 0 to 1 (happiness)
 * @param tempo
 */
function colorize(feats) {
    danceabilityColor = hexToRgb("#f15bb5")
    energyColor = hexToRgb("#fee440")
    loudnessColor = hexToRgb("#9d0208")
    speechinessColor = hexToRgb("#4cc9f0")
    acousticnessColor = hexToRgb("#9d6b53")
    instrumentalnessColor = hexToRgb("#2c7da0")
    livenessColor = hexToRgb("#007f5f")
    valenceColor = hexToRgb("#ef476f")
    tempoColor = hexToRgb("#5a189a")
    let red = (ratio(danceabilityColor.r, feats.danceability) +
        ratio(energyColor.r, feats.energy) +
        ratio(loudnessColor.r, Math.abs(feats.loudness/60)) +
        ratio(speechinessColor.r, feats.speechiness) +
        ratio(acousticnessColor.r, feats.acousticness) +
        ratio(instrumentalnessColor.r, feats.instrumentalness) +
        ratio(livenessColor.r, feats.liveness) +
        ratio(valenceColor.r, feats.valence * VALENCE_FACTOR) -
        ratio(tempoColor.r, feats.tempo/200)) * 0.5 // TODO: needs to find a better equation

    let green = (ratio(danceabilityColor.g, feats.danceability) +
        ratio(energyColor.g, feats.energy) +
        ratio(loudnessColor.g, Math.abs(feats.loudness/60)) +
        ratio(speechinessColor.g, feats.speechiness) +
        ratio(acousticnessColor.g, feats.acousticness) +
        ratio(instrumentalnessColor.g, feats.instrumentalness) +
        ratio(livenessColor.g, feats.liveness) +
        ratio(valenceColor.g, feats.valence * VALENCE_FACTOR) -
        ratio(tempoColor.g, feats.tempo/200)) * 0.5

    let blue = (ratio(danceabilityColor.b, feats.danceability) +
        ratio(energyColor.b, feats.energy) +
        ratio(loudnessColor.b, Math.abs(feats.loudness/60)) +
        ratio(speechinessColor.b, feats.speechiness) +
        ratio(acousticnessColor.b, feats.acousticness) +
        ratio(instrumentalnessColor.b, feats.instrumentalness) +
        ratio(livenessColor.b, feats.liveness) +
        ratio(valenceColor.b, feats.valence * VALENCE_FACTOR) +
        ratio(tempoColor.b, feats.tempo/200)) * 0.5
    return 'rgb(' + red + ',' + green + ',' + blue + ')'
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new colorObj(
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ) : null;
}

function ratio(base, intensity) {
    return Math.pow(base, intensity)
}

function rgbify(color) {
    return 'rgb(' + color.red + ',' + color.green + ',' + color.blue + ')'
}

/**
 * Creates a linear gradient of the colors of the audio feats
 *
 * @param feats
 * @returns {string}
 */
function colorGradient(feats) {
    danceabilityColor = hexToRgb("#f15bb5")
    energyColor = hexToRgb("#fee440")
    loudnessColor = hexToRgb("#9d0208")
    speechinessColor = hexToRgb("#4cc9f0")
    acousticnessColor = hexToRgb("#9d6b53")
    instrumentalnessColor = hexToRgb("#2c7da0")
    livenessColor = hexToRgb("#007f5f")
    valenceColor = hexToRgb("#ef476f")
    tempoColor = hexToRgb("#5a189a")

    return "linear-gradient(to right, " +
         danceabilityColor.toStringAlpha(feats.danceability)+ "," +
         energyColor.toStringAlpha(feats.energy)+ "," +
         loudnessColor.toStringAlpha(Math.abs(feats.loudness/60))+ "," +
         speechinessColor.toStringAlpha(feats.speechiness)+ "," +
         acousticnessColor.toStringAlpha(feats.acousticness)+ "," +
         instrumentalnessColor.toStringAlpha(feats.instrumentalness)+ "," +
         livenessColor.toStringAlpha(feats.liveness)+ "," +
         valenceColor.toStringAlpha(feats.valence)+ "," +
         tempoColor.toStringAlpha(feats.tempo/200) +")"
}