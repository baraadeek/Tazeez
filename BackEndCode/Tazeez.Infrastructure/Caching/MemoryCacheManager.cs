using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;
using Tazeez.Common.Extensions;

namespace Tazeez.Infrastructure.Caching
{
    public class MemoryCacheManager : ICacheManager
    {
        private readonly IMemoryCache _cache;
        private static int DefaultCacheTimeMinutes => 60;

        public MemoryCacheManager(IMemoryCache cache)
        {
            _cache = cache;
        }

        public virtual T Get<T>(string key)
        {
            return _cache.Get<T>(key);
        }

        public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> factory)
        {
            return await _cache.GetOrCreateAsync(key, async entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(DefaultCacheTimeMinutes);
                return await factory().AnyContext();
            });
        }

        public T GetOrCreate<T>(string key, Func<T> factory)
        {
            return _cache.GetOrCreate(key, entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(DefaultCacheTimeMinutes);
                return factory();
            });
        }

        public T GetOrCreate<T>(string key, int cacheTimeInMinutes, Func<T> factory)
        {
            return _cache.GetOrCreate(key, entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(cacheTimeInMinutes);
                return factory();
            });
        }

        public virtual void Set(string key, object data)
        {
            if (data != null)
            {
                _cache.Set(key, data, TimeSpan.FromMinutes(DefaultCacheTimeMinutes));
            }
        }

        public virtual void Set(string key, object data, int cacheTimeInMinutes)
        {
            if (data != null)
            {
                _cache.Set(key, data, TimeSpan.FromMinutes(cacheTimeInMinutes));
            }
        }

        public virtual bool IsSet(string key)
        {
            return _cache.TryGetValue(key, out object _);
        }

        public virtual void Remove(string key)
        {
            _cache.Remove(key);
        }
    }
}