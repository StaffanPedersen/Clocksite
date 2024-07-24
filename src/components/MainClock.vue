<template>
  <div class="clock-container">
    <svg width="200" height="200" viewBox="0 0 100 100">
      <!-- Clock circle -->
      <circle cx="50" cy="50" r="45" stroke="black" stroke-width="2" fill="white" />
      <!-- Hour hand -->
      <rect id="hour" x="48.5" y="30" width="3" height="20" fill="black" />
      <!-- Minute hand -->
      <rect id="minute" x="49" y="20" width="2" height="30" fill="black" />
      <!-- Second hand -->
      <rect id="second" x="49.5" y="10" width="1" height="40" fill="red" />
      <!-- Center circle -->
      <circle cx="50" cy="50" r="1" fill="black" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MainClock',
  mounted() {
    this.updateClock()
    setInterval(this.updateClock, 1000)
  },
  methods: {
    updateClock() {
      const now = new Date()
      const seconds = now.getSeconds()
      const minutes = now.getMinutes()
      const hours = now.getHours()

      const secondsDeg = ((seconds / 60) * 360);
      const minutesDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6);
      const hoursDeg = ((hours % 12) / 12 * 360) + ((minutes / 60) * 30);

      this.setHandRotation('second', secondsDeg)
      this.setHandRotation('minute', minutesDeg)
      this.setHandRotation('hour', hoursDeg)
    },
    setHandRotation(handId, rotationDegrees) {
      const hand = document.getElementById(handId)
      hand.style.transform = `rotate(${rotationDegrees}deg)`
      hand.style.transformOrigin = '50% 50%'
    }
  }
}
</script>

<style>
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30dvh;
}
</style>
