import { useEffect, useRef } from "react"

export default function ParticlesBackground() {

  const canvasRef = useRef(null) // It holds a reference to the canvas element

  useEffect(() => {
    const canvas = canvasRef.current // Access the canvas element
    const ctx = canvas.getContext("2d") // Get the 2D drawing context
  
    let particles = [] // Array to hold the particles
    const particleCount = 50 // Number of particles to create
    const colors = ['#ffffff'] // Colors for the particles
  
    class Particle{
      constructor() {
        this.x = Math.random() * canvas.width ;// Random x axis position
        this.y = Math.random() * canvas.height; // Random y axis position
        this.radius = Math.random() * 2 + 1; // Random size between 1 and 6
        this.color = colors[Math.floor(Math.random() * colors.length)]; // Random color from the array
        this.speedX = (Math.random() - 0.5) * 0.5; // Random horizontal speed
        this.speedY = (Math.random() - 0.5) * 0.5; // Random vertical speed
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() { 
        this.x += this.speedX; // Update x position based on speed
        this.y += this.speedY; // Update y position based on speed

        // Wrap around the edges of the canvas
        if (this.x < 0 ) this.x = canvas.width; // Wrap around to the right edge
        if (this.x > canvas.width) this.x = 0; // Wrap around to the left edge
        if (this.y < 0) this.y = canvas.height; // Wrap around to the bottom edge
        if (this.y > canvas.height) this.y = 0; // Wrap around to the top edge
      
        this.draw(); // Draw the particle at its new position
      }
    }

    // Create the particles

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    // Handle Canvas Size

    function handleResize() {
      canvas.width = window.innerWidth; // Set canvas width to window width
      canvas.height = window.innerHeight; // Set canvas height to window height
      createParticles(); // Recreate particles to fit the new canvas size
    }

    handleResize() // Initial setup of canvas size and particles
    window.addEventListener("resize", handleResize) // Add event listener for canvas resize
  

    // Animation Loop
    let animationId;

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for the next frame
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate); // Request the next animation frame
    }

    animate() // Start the animation loop

    // Cleanup function to stop the animation and remove event listener when the component unmounts
    return () => {
      cancelAnimationFrame(animationId); // Stop the animation loop
      window.removeEventListener("resize", handleResize); // Remove the resize event listener
    }

  },[])

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"></canvas>
  )
}
