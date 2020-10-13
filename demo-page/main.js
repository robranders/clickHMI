function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const state = {
  t1: 0,
  t2: 0,
  boiler: false,
  burner: false,
  t1_hi: 90,
  t1_lo: 70,
  t2_hi: 80,
  t2_lo: 60,
  advance: function() {
    const {t1_hi, t1_lo, t2_lo, t2_hi} = this;

    if (this.t1 >= t1_hi) this.burner = false;
    if (this.t1 < t1_lo) this.burner = true;
    if (this.t2 >= t2_hi) this.boiler = false;
    if (this.t2 < t2_lo) this.boiler = true;

    if (this.burner && !this.boiler) this.t1 += 3;
    if (this.burner && this.boiler) this.t1 += 2;

    if (this.boiler) this.t2++;

    setSvgText("svg-t1", this.t1);
    setSvgText("svg-t2", this.t2);

    setSvgColor("svg-pump1", this.boiler ? "#00ff00" :"#ffffff");
    setSvgColor("svg-burner1", this.burner ? "#00ff00" :"#ffffff");

  },
  start: function(){
    setInterval(() => {
      state.advance();
    }, 400)
  }
}

const svgElements = [
  {
    id: "svg-t1",
  },
  {
    id: "svg-t2"
  },
  {
    id: "svg-pump1"
  },
  {
    id: "svg-burner1"
  }
]

const setSvgText = (id, val) => {
  document.querySelectorAll(`#${id}`).forEach(el => {
    el.innerHTML = val;
  })
}

const setSvgColor = (id, val) => {
  document.querySelectorAll(`#${id}`).forEach(el => {
    el.style.fill = val;
  })
}

ready(() => {
  // Get SVG container
  const pid = document.querySelectorAll(".pid");

  // Load SVG and drop into container
  fetch("/img/ClickHMI_Demo1.svg")
  .then(res => res.text())
  .then(res => {
    pid.forEach(el => {
      el.innerHTML = res
    })
  })
  .catch(err => console.error(err))
})