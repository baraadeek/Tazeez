namespace Tazeez.Infrastructure.Caching
{
    public interface ICacheManager
    {
        T Get<T>(string key);

        bool IsSet(string key);

        void Remove(string key);

        void Set(string key, object data);

        void Set(string key, object data, int cacheTimeInMinutes);
    }
}