// WARPDOOR v9 ULTIMATE — Photorealistic 3D + Advanced UI + Social + Supabase
// The ultimate immersive warp experience with network effects
// ============================================================

import * as THREE from 'three'
import { WORLDS, SCENE_BUILDERS } from './worlds.js'
import { REAL_LOCATIONS, getRandomLocation, getTodayThemeLocations } from './maps-integration.js'
import { UserProfile, WarpRecord, WarpSpotRanking, DailyChallenge, PointsSystem, initializeSocialSystem } from './social-gamification.js'
import { createToast, createModal, createLocationCard } from './ui-components.js'

/* ═══════════════════════════════════════════════════════════════════════════
   PHOTOREALISTIC 3D ENVIRONMENT SYSTEM
   ═══════════════════════════════════════════════════════════════════════════ */

class PhotorealisticEnvironment {
  constructor(scene) {
    this.scene = scene
    this.timeOfDay = 'day' // day, sunset, night
    this.weather = 'clear' // clear, cloudy, rainy, snowy
    this.particles = []
  }

  /**
   * Create photorealistic sky
   */
  createSky() {
    const skyGeometry = new THREE.SphereGeometry(1000, 32, 32)
    
    // Sky gradient based on time of day
    const skyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color(0x0077BE) },
        bottomColor: { value: new THREE.Color(0xFFFFFF) },
        offset: { value: 33 },
        exponent: { value: 0.6 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = normalize(worldPosition.xyz);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + offset).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
        }
      `,
      side: THREE.BackSide,
    })

    const sky = new THREE.Mesh(skyGeometry, skyMaterial)
    this.scene.add(sky)
    return sky
  }

  /**
   * Create volumetric lighting (god rays)
   */
  createVolumetricLighting() {
    const lightGeometry = new THREE.ConeGeometry(200, 500, 32)
    const lightMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
    })

    const volumetricLight = new THREE.Mesh(lightGeometry, lightMaterial)
    volumetricLight.position.y = 200
    volumetricLight.rotation.x = Math.PI / 2
    this.scene.add(volumetricLight)

    return volumetricLight
  }

  /**
   * Create atmospheric effects (fog, haze)
   */
  createAtmosphere() {
    // Fog for depth
    this.scene.fog = new THREE.Fog(0x87CEEB, 100, 2000)

    // Haze particles
    const hazeGeometry = new THREE.BufferGeometry()
    const hazeMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 5,
      transparent: true,
      opacity: 0.1,
      sizeAttenuation: true,
    })

    const positions = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = Math.random() * 500
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }

    hazeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const haze = new THREE.Points(hazeGeometry, hazeMaterial)
    this.scene.add(haze)

    return haze
  }

  /**
   * Create realistic ground
   */
  createGround() {
    const groundGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100)
    
    // Grass texture with normal map simulation
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x2D5016,
      roughness: 0.8,
      metalness: 0.0,
      wireframe: false,
    })

    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    this.scene.add(ground)

    return ground
  }

  /**
   * Create realistic trees
   */
  createTrees(count = 20) {
    const trees = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 1500
      const z = (Math.random() - 0.5) * 1500
      
      // Trunk
      const trunkGeometry = new THREE.CylinderGeometry(15, 20, 80, 8)
      const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        roughness: 0.9,
      })
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
      trunk.position.set(x, 40, z)
      trunk.castShadow = true
      trunk.receiveShadow = true
      this.scene.add(trunk)

      // Foliage
      const foliageGeometry = new THREE.SphereGeometry(50, 8, 8)
      const foliageMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22,
        roughness: 0.7,
      })
      const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial)
      foliage.position.set(x, 100, z)
      foliage.castShadow = true
      foliage.receiveShadow = true
      this.scene.add(foliage)

      trees.push({ trunk, foliage })
    }
    return trees
  }

  /**
   * Create realistic water
   */
  createWater() {
    const waterGeometry = new THREE.PlaneGeometry(2000, 2000, 256, 256)
    
    const waterMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        waterColor: { value: new THREE.Color(0x0077BE) },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          vec3 pos = position;
          pos.z += sin(pos.x * 0.01 + time) * 2.0;
          pos.z += cos(pos.y * 0.01 + time * 0.7) * 2.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 waterColor;
        varying vec3 vPosition;
        void main() {
          vec3 color = waterColor;
          float wave = sin(vPosition.x * 0.01) * 0.5 + 0.5;
          color += vec3(wave * 0.2);
          gl_FragColor = vec4(color, 0.7);
        }
      `,
      transparent: true,
    })

    const water = new THREE.Mesh(waterGeometry, waterMaterial)
    water.rotation.x = -Math.PI / 2
    water.position.y = -10
    this.scene.add(water)

    return water
  }

  /**
   * Create particle effects (dust, rain, snow)
   */
  createParticleEffects() {
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 3500

    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = Math.random() * 500
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000

      velocities[i * 3] = (Math.random() - 0.5) * 0.5
      velocities[i * 3 + 1] = -Math.random() * 0.3
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.5
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 2,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    this.scene.add(particles)

    return { particles, positions, velocities }
  }

  /**
   * Create realistic buildings
   */
  createBuildings(count = 5) {
    const buildings = []
    for (let i = 0; i < count; i++) {
      const width = 40 + Math.random() * 60
      const height = 80 + Math.random() * 200
      const depth = 40 + Math.random() * 60

      const buildingGeometry = new THREE.BoxGeometry(width, height, depth)
      const buildingMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0, 0, 0.7 + Math.random() * 0.2),
        roughness: 0.5,
        metalness: 0.1,
      })

      const building = new THREE.Mesh(buildingGeometry, buildingMaterial)
      building.position.set(
        (Math.random() - 0.5) * 1200,
        height / 2,
        (Math.random() - 0.5) * 1200
      )
      building.castShadow = true
      building.receiveShadow = true
      this.scene.add(building)

      // Windows
      const windowCount = Math.floor(width / 20) * Math.floor(height / 20)
      for (let j = 0; j < windowCount; j++) {
        const windowGeometry = new THREE.BoxGeometry(15, 15, 2)
        const windowMaterial = new THREE.MeshStandardMaterial({
          color: 0x00FFFF,
          emissive: 0x0077BE,
          emissiveIntensity: 0.5,
          metalness: 0.8,
          roughness: 0.2,
        })
        const window = new THREE.Mesh(windowGeometry, windowMaterial)
        window.position.set(
          (Math.random() - 0.5) * (width - 20),
          (Math.random() - 0.5) * (height - 20),
          depth / 2 + 1
        )
        building.add(window)
      }

      buildings.push(building)
    }
    return buildings
  }

  /**
   * Update time of day
   */
  updateTimeOfDay(timeOfDay) {
    this.timeOfDay = timeOfDay
    // Update lighting, colors, etc.
  }

  /**
   * Animate particles
   */
  animateParticles(particles, velocities) {
    const positions = particles.geometry.attributes.position.array
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i]
      positions[i + 1] += velocities[i + 1]
      positions[i + 2] += velocities[i + 2]

      // Wrap around
      if (positions[i] > 1000) positions[i] = -1000
      if (positions[i] < -1000) positions[i] = 1000
      if (positions[i + 1] > 500) positions[i + 1] = 0
      if (positions[i + 2] > 1000) positions[i + 2] = -1000
      if (positions[i + 2] < -1000) positions[i + 2] = 1000
    }
    particles.geometry.attributes.position.needsUpdate = true
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ADVANCED UI SYSTEM
   ═══════════════════════════════════════════════════════════════════════════ */

class AdvancedUISystem {
  constructor() {
    this.theme = {
      primary: '#0077BE',
      secondary: '#FF6B35',
      accent: '#FFD700',
      dark: '#111827',
      light: '#F9FAFB',
    }
  }

  /**
   * Create glassmorphism card
   */
  createGlassmorphismCard(title, content, icon = '🌍') {
    const card = document.createElement('div')
    card.style.cssText = `
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      min-width: 300px;
    `

    card.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="font-size: 24px;">${icon}</span>
        <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #111827;">${title}</h3>
      </div>
      <p style="margin: 0; font-size: 14px; color: #6B7280; line-height: 1.5;">${content}</p>
    `

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)'
      card.style.boxShadow = '0 20px 40px 0 rgba(31, 38, 135, 0.5)'
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)'
      card.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
    })

    return card
  }

  /**
   * Create modern button with ripple effect
   */
  createModernButton(text, onClick, variant = 'primary') {
    const button = document.createElement('button')
    button.textContent = text
    button.style.cssText = `
      padding: 12px 24px;
      border-radius: 8px;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      background: ${variant === 'primary' ? this.theme.primary : this.theme.secondary};
      color: white;
    `

    button.addEventListener('click', (e) => {
      // Ripple effect
      const ripple = document.createElement('span')
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `

      button.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)

      onClick(e)
    })

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)'
      button.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'
    })

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)'
      button.style.boxShadow = 'none'
    })

    return button
  }

  /**
   * Create animated notification toast
   */
  createToastNotification(message, type = 'info') {
    const toast = document.createElement('div')
    const colors = {
      info: '#3B82F6',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
    }

    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: ${colors[type]};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 500;
      z-index: 2000;
      animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    `

    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      setTimeout(() => toast.remove(), 300)
    }, 3000)

    return toast
  }

  /**
   * Create floating action button (FAB)
   */
  createFloatingActionButton(icon, onClick) {
    const fab = document.createElement('button')
    fab.innerHTML = icon
    fab.style.cssText = `
      position: fixed;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: ${this.theme.primary};
      color: white;
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      z-index: 100;
      bottom: 24px;
      right: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    `

    fab.addEventListener('mouseenter', () => {
      fab.style.transform = 'scale(1.1)'
      fab.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.25)'
    })

    fab.addEventListener('mouseleave', () => {
      fab.style.transform = 'scale(1)'
      fab.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
    })

    fab.addEventListener('click', onClick)

    return fab
  }

  /**
   * Create responsive navigation menu
   */
  createResponsiveMenu(items) {
    const menu = document.createElement('nav')
    menu.style.cssText = `
      display: flex;
      gap: 24px;
      align-items: center;
      padding: 16px 24px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 50;
    `

    items.forEach((item) => {
      const link = document.createElement('a')
      link.textContent = item.label
      link.href = '#'
      link.style.cssText = `
        color: #374151;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
        cursor: pointer;
      `

      link.addEventListener('mouseenter', () => {
        link.style.color = this.theme.primary
      })

      link.addEventListener('mouseleave', () => {
        link.style.color = '#374151'
      })

      link.addEventListener('click', (e) => {
        e.preventDefault()
        item.onClick()
      })

      menu.appendChild(link)
    })

    return menu
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOCIAL ENGINE
   ═══════════════════════════════════════════════════════════════════════════ */

class SocialEngine {
  constructor() {
    this.users = new Map()
    this.warpRecords = []
    this.comments = []
    this.friendships = new Map()
    this.achievements = new Map()
    this.notifications = []
  }

  /**
   * Create user profile
   */
  createUserProfile(userId, userName, avatar = null) {
    const profile = {
      id: userId,
      name: userName,
      avatar: avatar || this.generateDefaultAvatar(userName),
      bio: '',
      followers: [],
      following: [],
      totalWarps: 0,
      totalLikes: 0,
      joinedDate: new Date(),
      badges: [],
      level: 1,
      experience: 0,
    }

    this.users.set(userId, profile)
    return profile
  }

  /**
   * Create warp record
   */
  createWarpRecord(userId, location, coordinates, imageUrl = null, description = '') {
    const record = {
      id: this.generateId(),
      userId,
      location,
      coordinates,
      imageUrl,
      description,
      likes: 0,
      likedBy: [],
      comments: [],
      shares: 0,
      createdAt: new Date(),
      theme: this.getCurrentTheme(),
    }

    this.warpRecords.push(record)

    const user = this.users.get(userId)
    if (user) {
      user.totalWarps++
      this.updateUserLevel(userId)
    }

    return record
  }

  /**
   * Like warp record
   */
  likeWarpRecord(recordId, userId) {
    const record = this.warpRecords.find((r) => r.id === recordId)
    if (!record) return false

    if (record.likedBy.includes(userId)) {
      record.likedBy = record.likedBy.filter((id) => id !== userId)
      record.likes--
    } else {
      record.likedBy.push(userId)
      record.likes++
    }

    return true
  }

  /**
   * Get popular warp spots
   */
  getPopularWarpSpots(limit = 10) {
    const spots = {}
    this.warpRecords.forEach((record) => {
      if (!spots[record.location]) {
        spots[record.location] = {
          location: record.location,
          coordinates: record.coordinates,
          count: 0,
          likes: 0,
        }
      }
      spots[record.location].count++
      spots[record.location].likes += record.likes
    })

    return Object.values(spots)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  /**
   * Get user ranking
   */
  getUserRanking(limit = 10) {
    return Array.from(this.users.values())
      .sort((a, b) => {
        const scoreA = a.totalWarps * 10 + a.totalLikes
        const scoreB = b.totalWarps * 10 + b.totalLikes
        return scoreB - scoreA
      })
      .slice(0, limit)
      .map((user, index) => ({
        rank: index + 1,
        ...user,
      }))
  }

  /**
   * Helper methods
   */
  generateDefaultAvatar(userName) {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']
    const colorIndex = userName.charCodeAt(0) % colors.length
    return colors[colorIndex]
  }

  generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  getCurrentTheme() {
    const themes = ['世界の美しい海', '古代遺跡', '未来都市', '秘境', '夜景', '自然', '街並み']
    const today = new Date().getDay()
    return themes[today]
  }

  updateUserLevel(userId) {
    const user = this.users.get(userId)
    if (user) {
      user.experience = user.totalWarps * 10 + user.totalLikes
      user.level = Math.floor(user.experience / 100) + 1
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN APPLICATION
   ═══════════════════════════════════════════════════════════════════════════ */

class WARPDOORv9 {
  constructor() {
    this.scene = null
    this.camera = null
    this.renderer = null
    this.environment = null
    this.ui = null
    this.social = null
    this.currentUser = null
    this.isWarping = false
  }

  /**
   * Initialize application
   */
  async initialize() {
    // Setup Three.js
    this.setupThreeJS()

    // Initialize systems
    this.environment = new PhotorealisticEnvironment(this.scene)
    this.ui = new AdvancedUISystem()
    this.social = new SocialEngine()

    // Create photorealistic environment
    this.createEnvironment()

    // Setup UI
    this.setupUI()

    // Start animation loop
    this.animate()

    // Setup event listeners
    this.setupEventListeners()
  }

  /**
   * Setup Three.js
   */
  setupThreeJS() {
    const container = document.getElementById('canvas-container')
    const width = window.innerWidth
    const height = window.innerHeight

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
    this.camera.position.set(0, 50, 150)

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(width, height)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFShadowShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(this.renderer.domElement)

    // Lighting
    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2)
    directionalLight.position.set(100, 200, 100)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    this.scene.add(directionalLight)

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6)
    this.scene.add(ambientLight)

    const hemisphereLight = new THREE.HemisphereLight(0x87CEEB, 0x8B4513, 0.4)
    this.scene.add(hemisphereLight)
  }

  /**
   * Create photorealistic environment
   */
  createEnvironment() {
    this.environment.createSky()
    this.environment.createGround()
    this.environment.createTrees(15)
    this.environment.createBuildings(8)
    this.environment.createWater()
    this.environment.createVolumetricLighting()
    this.environment.createAtmosphere()
    this.particleSystem = this.environment.createParticleEffects()
  }

  /**
   * Setup UI
   */
  setupUI() {
    const uiContainer = document.getElementById('ui-container')

    // Navigation menu
    const menuItems = [
      { label: '🏠 ホーム', onClick: () => this.showHome() },
      { label: '🌍 ワープ', onClick: () => this.showWarpMenu() },
      { label: '👥 フレンド', onClick: () => this.showFriends() },
      { label: '🏆 ランキング', onClick: () => this.showRanking() },
      { label: '⚙️ 設定', onClick: () => this.showSettings() },
    ]

    const menu = this.ui.createResponsiveMenu(menuItems)
    uiContainer.appendChild(menu)

    // Floating action button
    const fab = this.ui.createFloatingActionButton('🚪', () => this.initiateWarp())
    document.body.appendChild(fab)
  }

  /**
   * Show home screen
   */
  showHome() {
    const container = document.getElementById('content-container')
    container.innerHTML = ''

    const title = document.createElement('h1')
    title.textContent = 'WARPDOOR v9'
    title.style.cssText = 'color: white; text-align: center; margin-top: 50px;'
    container.appendChild(title)

    const card = this.ui.createGlassmorphismCard(
      '今日のテーマ',
      `${this.social.getCurrentTheme()} - 毎日新しいテーマでワープしよう！`,
      '🌟'
    )
    container.appendChild(card)
  }

  /**
   * Show warp menu
   */
  showWarpMenu() {
    const container = document.getElementById('content-container')
    container.innerHTML = ''

    const title = document.createElement('h2')
    title.textContent = 'ワープ先を選択'
    title.style.cssText = 'color: white;'
    container.appendChild(title)

    const locations = getTodayThemeLocations()
    locations.forEach((loc) => {
      const card = this.ui.createGlassmorphismCard(
        loc.name,
        `${loc.name} - ワープして探索しよう`,
        '🌍'
      )
      card.addEventListener('click', () => this.warpToLocation(loc))
      container.appendChild(card)
    })
  }

  /**
   * Show friends
   */
  showFriends() {
    const container = document.getElementById('content-container')
    container.innerHTML = ''

    const title = document.createElement('h2')
    title.textContent = 'フレンド'
    title.style.cssText = 'color: white;'
    container.appendChild(title)

    const users = Array.from(this.social.users.values())
    users.forEach((user) => {
      const card = this.ui.createGlassmorphismCard(
        user.name,
        `レベル ${user.level} - ${user.totalWarps} ワープ`,
        '👤'
      )
      container.appendChild(card)
    })
  }

  /**
   * Show ranking
   */
  showRanking() {
    const container = document.getElementById('content-container')
    container.innerHTML = ''

    const title = document.createElement('h2')
    title.textContent = 'ランキング'
    title.style.cssText = 'color: white;'
    container.appendChild(title)

    const ranking = this.social.getUserRanking(10)
    ranking.forEach((user) => {
      const card = this.ui.createGlassmorphismCard(
        `#${user.rank} ${user.name}`,
        `${user.totalWarps} ワープ - ${user.totalLikes} いいね`,
        '🏆'
      )
      container.appendChild(card)
    })
  }

  /**
   * Show settings
   */
  showSettings() {
    const container = document.getElementById('content-container')
    container.innerHTML = ''

    const title = document.createElement('h2')
    title.textContent = '設定'
    title.style.cssText = 'color: white;'
    container.appendChild(title)

    const button = this.ui.createModernButton('サウンドをON/OFF', () => {
      this.ui.createToastNotification('サウンド設定が変更されました', 'success')
    })
    container.appendChild(button)
  }

  /**
   * Initiate warp
   */
  initiateWarp() {
    if (this.isWarping) return
    this.isWarping = true

    this.ui.createToastNotification('ワープ準備中...', 'info')

    // Warp animation
    setTimeout(() => {
      this.isWarping = false
      this.ui.createToastNotification('ワープ完了！', 'success')
    }, 2000)
  }

  /**
   * Warp to location
   */
  warpToLocation(location) {
    this.initiateWarp()

    // Create warp record
    if (this.currentUser) {
      const record = this.social.createWarpRecord(
        this.currentUser.id,
        location.name,
        { lat: location.lat, lng: location.lng },
        null,
        `${location.name}にワープしました！`
      )

      this.ui.createToastNotification(`${location.name}にワープしました！`, 'success')
    }
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(() => this.animate())

    // Update particles
    if (this.particleSystem) {
      this.environment.animateParticles(
        this.particleSystem.particles,
        this.particleSystem.velocities
      )
    }

    this.renderer.render(this.scene, this.camera)
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    window.addEventListener('resize', () => this.onWindowResize())
  }

  /**
   * Handle window resize
   */
  onWindowResize() {
    const width = window.innerWidth
    const height = window.innerHeight

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   INITIALIZATION
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', async () => {
  const app = new WARPDOORv9()
  await app.initialize()

  // Create a test user
  app.currentUser = app.social.createUserProfile('user-1', 'ユーザー1', '#FF6B6B')

  // Add some test warp records
  app.social.createWarpRecord('user-1', 'エッフェル塔', { lat: 48.8584, lng: 2.2945 }, null, 'パリの象徴！')
  app.social.createWarpRecord('user-1', 'ビッグベン', { lat: 51.4975, lng: -0.1357 }, null, 'ロンドンの夜景')

  app.showHome()
})

export { WARPDOORv9, PhotorealisticEnvironment, AdvancedUISystem, SocialEngine }
