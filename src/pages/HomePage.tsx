import { MessageCircle, Code, Zap } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar/Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-40">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">ChatWise.ai</h1>
            <div className="space-x-6 hidden md:flex">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Recursos</a>
              <a href="#demo" className="text-gray-600 hover:text-blue-600 transition-colors">Demo</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contato</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Automatize seu Atendimento com IA
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Um chatbot inteligente que entende, responde e aprende com seus clientes
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
            Começar Agora
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Recursos Principais</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-600 mb-4">
                <MessageCircle size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Respostas Inteligentes</h4>
              <p className="text-gray-600">
                Interações naturais e contextualizadas com seus clientes
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-600 mb-4">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Rápida Integração</h4>
              <p className="text-gray-600">
                Implemente em minutos em qualquer site ou aplicação
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-600 mb-4">
                <Code size={32} />
              </div>
              <h4 className="text-xl font-semibold mb-2">Personalização Total</h4>
              <p className="text-gray-600">
                Adapte o visual e comportamento às suas necessidades
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-8">
            Experimente Agora
          </h3>
          <p className="text-gray-600 mb-8">
            Interaja com nossa demonstração e descubra como podemos ajudar seu negócio
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Entre em Contato</h3>
          <form className="bg-white p-8 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Nome</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Solicitar Demonstração
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 ChatWise.ai. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;