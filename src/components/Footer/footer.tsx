import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedin, FaBook, FaGraduationCap } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Courses', href: '/courses' },
      { name: 'Pricing', href: '/subscription' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    social: [
      {
        name: 'GitHub',
        href: 'https://github.com',
        icon: FaGithub,
      },
      {
        name: 'Twitter',
        href: 'https://twitter.com',
        icon: FaTwitter,
      },
      {
        name: 'LinkedIn',
        href: 'https://linkedin.com',
        icon: FaLinkedin,
      },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orange-500 transition-colors"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex items-center justify-center space-x-4">
            <FaGraduationCap className="h-8 w-8 text-orange-500" />
            <span className="text-xl font-bold bg-gradient-to-right from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Converso
            </span>
          </div>
          <p className="mt-4 text-center text-sm leading-5 text-gray-400">
            &copy; {currentYear} Converso. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            {navigation.main.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-400">
          <p>Made with ❤️ for better learning experiences</p>
          <p className="mt-2">
            <span className="inline-flex items-center justify-center">
              <FaBook className="mr-1.5 h-4 w-4 text-orange-500" />
              Empowering education through AI technology
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
